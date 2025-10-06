import ChallengeEmail from "@/emails/challenge";
import { bcryptPasswordCompare, bcryptPasswordHash } from "./brypt";
import { redis } from "./redis-store";
import { resend } from "./resend";
import { prisma } from "./prisma";

const REDIS_PREFIX = "otp";
const SENDER_EMAIL = "onboarding@resend.dev";

// issue new 2fa for user and sends them the code
// if there is an outstanding 2fa challenge for the user, it just resend the code

interface Challenge {
  codeHash: string;
  email: string;
}
export async function issueChallenge(userId: string, email: string) {
  const array = new Uint32Array(1);
  const code = (crypto.getRandomValues(array)[0] % 900000) + 100000; // Generate a 6-digit code
  const hash = await bcryptPasswordHash(code.toString());
  const challenge = {
    codeHash: hash,
    email,
  };

  await redis.setex(`${REDIS_PREFIX}:uid-${userId}`, 60 * 60, challenge);
  const { error } = await resend.emails.send({
    from: `RIM GLOBAL <${SENDER_EMAIL}>`,
    to: email,
    subject: "Your OTP Code",
    html: `<p>${code}</p>`,
    react: ChallengeEmail({
      data: { code },
    }),
  });

  if (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send OTP email");
  }
}

export async function completeChallenge(userId: string, code: string) {
  const challenge = await redis.get<Challenge>(`${REDIS_PREFIX}:uid-${userId}`);
  if (challenge) {
    const isCorrect = await bcryptPasswordCompare(code, challenge.codeHash);
    if (isCorrect) {
        const session = await prisma.session.findFirst({
            where: {
                userId,
                requireF2A: true, 
            }
        })
        if (session) {
            await prisma.session.updateMany({
                where: {
                    sessionToken: session.sessionToken,
                    userId,
                },
                data: {
                    requireF2A: false,
                }
            });
            await redis.del(`${REDIS_PREFIX}:uid-${userId}`);

            return {
                success: true,
                message: "2FA challenge completed successfully",
            }
        }

        return {
            success: false,
            message: "2FA challenge not found",
        }
    }
    return {
      success: false,
      message: "Invalid OTP code",
    };
  }
  return {
    success: false,
    message: "No OTP challenge found for this user",
  };
}
