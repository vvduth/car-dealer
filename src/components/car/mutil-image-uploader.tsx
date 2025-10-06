"use client";
import { UpdateCarType } from "@/app/schemas/car.schema";
import React, { useCallback, useEffect, useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";

import { v4 as uuidv4 } from "uuid";
import { generateThumbHashFromFile } from "@/lib/thumbhash-client";
import { createPngDataUri } from "unlazy/thumbhash";
import { ProcessArgs, Uploader } from "@/lib/uploader";
import { da } from "@faker-js/faker";
import { cn } from "@/lib/utils";
import DragAndDrop from "./drag-and-drop";
import dynamic from "next/dynamic";
import { SortableItem } from "./SortableItem";
import { Skeleton } from "../ui/skeleton";


const DragAndDropContext = dynamic(
	() => import("./drag-and-grop-context").then((mod) => mod.DragAndDropContext),
	{
		ssr: false,
		loading: () => (
			<div className="gap-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5">
				{[1, 2, 3, 4, 5, 6].map((i) => (
					<Skeleton key={i} className="aspect-3/2 rounded-md w-full" />
				))}
			</div>
		),
	},
);


export type CarImages = UpdateCarType["images"];
interface MultiImageUploaderProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  value?: CarImages;
}

type ImageProgess = {
  uuid: string;
  progress: number;
};

const MultiImageUploader = (props: MultiImageUploaderProps) => {
  const { className, value, ...rest } = props;
  const form = useFormContext<UpdateCarType>();
  const { fields, replace } = useFieldArray({
    control: form.control,
    name: "images",
    keyName: "uuid", // Use 'uuid' as the key name for each image
  });
  const [items, setItems] = useState<CarImages>(fields);
  const [progress, setProgress] = useState<ImageProgess[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (value) {
      setItems(value);
    }
  }, [value]);

  const handleItemProgress = useCallback((updates: ImageProgess) => {
    setProgress((prev) => {
      const index = prev.findIndex((item) => item.uuid === updates.uuid);
      if (index === -1) {
        return [...prev, updates];
      }
      const newProgess = [...prev];
      newProgess[index] = { ...newProgess[index], ...updates };
      return newProgess;
    });
  }, []);

  const handleItemUpdate = useCallback(
    (newItems: CarImages) => {
      replace(newItems);
      setItems(newItems);
    },
    [replace]
  );
  const setFiles = useCallback(
    async (validfiles: File[]) => {
      const files = Object.values(validfiles);
      setIsUploading(files.length > 0);
      let id = items.length + 1;
      const newImagedata: CarImages = [];
      for (const file of files) {
        const uuid = uuidv4();
        const hash = await generateThumbHashFromFile(file);
        const base64 = createPngDataUri(hash);
        const data = {
          id,
          uuid,
          percentage: 0,
          alt: file.name,
          key: "",
          src: "",
          base64,
          done: false,
        };
        newImagedata.push(data);
        id++;
        const options = { file, uuid };
        const uploader = new Uploader(options);
        uploader
          .onProgress((progress: ProcessArgs) => {
            if (progress.percentage !== data.percentage) {
              data.src = `${process.env.NEXT_PUBLIC_S3_BUCKET_URL}/${progress.key}`;
              data.key = progress.key || "";
              handleItemProgress({
                uuid,
                progress: progress.percentage,
              });

              const clone = items.concat(newImagedata);
              setItems(clone);
            }
          })
          .onError((error: Error) => {
            setIsUploading(false);
            console.error("Upload error:", error);
          })
          .onComplete(() => {
            data.done = true;
            const clone = items.concat(newImagedata).map((item) => ({
              ...item,
              percentage: 100,
            }));
            setItems(clone);
            replace(clone);
            setIsUploading(false);
          });
        uploader.start();
      }
    },
    [items, handleItemProgress, replace]
  );

  const remove = (i: number) => {
    setItems((prev) => prev.filter((item) => item.id !== i));
    replace(items.filter((item) => item.id !== i));
  };
  return (
    <div className={cn( className, `space-y-3 mt-1`)}>
      <DragAndDrop
        isUploading={isUploading}
        setIsUploading={setIsUploading}
        items={items}
        setFiles={setFiles}
      />
      <div className="relative overflow-hidden rounded-lg">
        {/* grag and grop context */}
        <DragAndDropContext 
        replace={handleItemUpdate}
        items={items}
        renderItem={(item) => (
          <SortableItem 
            key={item.uuid}
            index={item.id as number}
            item={item}
            remove={remove}
            progress={
              progress.find((p) => p.uuid === item.uuid)?.progress as number
            }
          />
        )}
          />
      </div>
    </div>
  );
};

export default MultiImageUploader;
