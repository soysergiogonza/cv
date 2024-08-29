'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';

const languages = {
 en: {
  tag: 'En',
  lang: 'English',
 },
 es: {
  tag: 'Es',
  lang: 'Español',
 },
};

export const LocaleSwitcher = () => {
 const [isOpen, setIsOpen] = useState(false);

 const router = useRouter();
 const pathname = usePathname();
 const localeActive = useLocale();
 const [isPending, startTransition] = useTransition();

 const handleChange = (newLocale: string) => {
  setIsOpen(true);
  newLocale !== localeActive &&
   startTransition(() => {
    const newPathname = pathname.replace(`/${localeActive}`, `/${newLocale}`);
    router.push(newPathname);
   });
 };

 return (
  <div className='relative inline-block text-left print:hidden'>
   <div>
    <button
     type='button'
     className='inline-flex justify-center w-full rounded-md px-4 py-2  text-sm font-medium text-gray-700'
     onClick={() => setIsOpen(!isOpen)}
     aria-haspopup='true'
     aria-expanded={isOpen}
    >
     {/*@ts-ignore*/}
     {languages[localeActive].tag}
    </button>
   </div>
   {isOpen && (
    <div className='origin-top-right absolute right-0 mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5'>
     <div
      className='py-1'
      role='menu'
      aria-orientation='vertical'
      aria-labelledby='options-menu'
     >
      {Object.entries(languages).map(([locale, { tag }]) => (
       <button
        type='button'
        key={locale}
        onClick={() => handleChange(locale)}
        className={`${
         locale === localeActive ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
        } flex items-center px-4 py-2 hover:bg-gray-100 hover:text-gray-900`}
        role='menuitem'
        disabled={isPending}
       >
        {tag}
       </button>
      ))}
     </div>
    </div>
   )}
  </div>
 );
};
