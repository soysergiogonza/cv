'use client';

import { Education } from '@/components/sections/Education';
import { Experience } from '@/components/sections/Experience';
import { Header } from '@/components/sections/Header';
import { Languages } from '@/components/sections/Languages';
import { Profile } from '@/components/sections/Profile';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

export default function Page() {
 const [currentProfileIndex, setCurrentProfileIndex] = useState(0);
 const t = useTranslations();

 const header = useTranslations('Header');
 const profile = useTranslations('Profile');
 const experience = useTranslations('Experience');
 const education = useTranslations('Education');
 const languages = useTranslations('Languages');

 const profiles = profile.raw('profiles') || [];
 const totalProfiles = profiles.length;
 const currentProfile = profiles[currentProfileIndex] || null;

 useEffect(() => {
  if (currentProfileIndex >= totalProfiles && totalProfiles > 0) {
   setCurrentProfileIndex(0);
  }
 }, [currentProfileIndex, totalProfiles]);

 return (
  <main className='min-h-screen  py-8 px-4 print:bg-white print:p-0'>
   <div className='container mx-auto max-w-4xl print:max-w-none'>
    <Card className='shadow-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 print:shadow-none print:border-0'>
     <CardContent className='p-8 print:p-0 space-y-4'>
      <Header header={header} t={t} />
      <Separator className='border border-gray-200' />
      <Profile
       profile={profile}
       currentProfile={currentProfile}
       currentProfileIndex={currentProfileIndex}
       totalProfiles={totalProfiles}
       setCurrentProfileIndex={setCurrentProfileIndex}
       t={t}
      />
      <Separator className='border border-gray-200' />
      <Experience experience={experience} />
      <Separator className='border border-gray-200' />
      <Education education={education} />
      <Separator className='border border-gray-200' />
      <Languages languages={languages} />
     </CardContent>
    </Card>
   </div>
  </main>
 );
}
