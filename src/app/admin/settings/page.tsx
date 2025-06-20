import { SettingsPageContent } from '@/components/settings/content'
import React from 'react'

const SettingPage = () => {
  return (
    <>
			<div className="flex flex-col p-6 text-muted">
				<div className="flex items-center justify-between">
					<h1 className="font-semibold text-lg md:text-2xl">
						Account Settings
					</h1>
				</div>
			</div>
      <SettingsPageContent />
		</>
  )
}

export default SettingPage
