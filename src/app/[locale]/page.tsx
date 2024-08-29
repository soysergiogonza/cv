import { LocaleSwitcher } from '@/components/LocaleSwitcher';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function Page() {
 const header = useTranslations('Header');
 const links = useTranslations('Links');
 const profile = useTranslations('Profile');
 const experience = useTranslations('Experience');
 const education = useTranslations('Education');
 const languages = useTranslations('Languages');

 // @ts-ignore
 return (
  <main className='container relative mx-auto scroll-my-12 overflow-auto p-4 print:p-12 md:p-16'>
   <section className='mx-auto w-full max-w-4xl space-y-8 bg-white print:space-y-4'>
    <div className='flex items-center justify-between'>
     <header className='flex flex-col gap-4'>
      <div className='flex items-center justify-between'>
       <h1 className='text-5xl font-bold'>{header('Name')}</h1>
       <LocaleSwitcher />
      </div>
      <div className='flex flex-wrap gap-1'>
       {/*@ts-ignore*/}
       {header.raw('TechStack').map((skill) => (
        <span
         className='print:text-[10px] content-around after:mr-1'
         key={skill}
        >
         {skill}
        </span>
       ))}
      </div>
      <span
       className='text-center flex-1 font-mono text-lg text-muted-foreground print:text-[12px]'
       key={header('City')}
      >
       {header('City')}
      </span>
      <div className='flex gap-x-1 pt-1 font-mono text-sm text-muted-foreground print:flex print:text-[12px] justify-between items-center'>
       <span>{header('Phone')}</span>
       <span>{header('Email')}</span>
      </div>
     </header>
    </div>
    <section className='flex flex-col gap-y-3'>
     <h2 className='text-xl font-bold'>{links('sectionTitle')}</h2>
     <div className='flex flex-1 gap-4 text-center'>
      {/*@ts-ignore*/}
      {links.raw('LinkList').map(({ url, title }) => (
       <Link href={url} key={title}>
        {title}
       </Link>
      ))}
     </div>
    </section>
    <section className='flex min-h-0 flex-col gap-y-3'>
     <h2 className='text-xl font-bold'>{profile('sectionTitle')}</h2>
     {/*@ts-ignore*/}
     {profile.raw('content').map((summary) => (
      <p
       className='text-pretty font-mono text-sm text-muted-foreground print:text-[12px]'
       key={summary}
      >
       {summary}
      </p>
     ))}
    </section>
    <section className='flex min-h-0 flex-col gap-y-3'>
     <h2 className='text-xl font-bold'>{experience('sectionTitle')}</h2>
     {/*@ts-ignore*/}
     {experience.raw('JobList').map((work) => {
      return (
       <div key={work.company}>
        <div>
         <div className='flex items-center justify-between gap-x-2 text-base'>
          <h3 className='inline-flex items-center justify-center gap-x-1 font-semibold leading-none'>
           <span className='font-mono text-sm leading-none print:text-[12px]'>
            {work.title}
           </span>
           <span className='inline-flex gap-x-1'>
            <div className='text-xs print:text-[8px] bg-secondary print:px-1 print:py-0.5 inline-flex items-center rounded-md border px-2 py-0.5 font-semibold font-mono transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-nowrap'>
             <span className='text-secondary-foreground'>{work.badge}</span>
            </div>
           </span>
          </h3>
          <div className='text-sm tabular-nums text-gray-500'>
           {work.startDate} - {work.endDate ?? 'Present'}
          </div>
         </div>

         <Link
          href={work.link}
          className='font-mono text-sm leading-none print:text-[12px] hover:underline'
         >
          {work.company}
         </Link>
        </div>
        <div className='mt-2 text-xs print:text-[10px]'>
         {/*@ts-ignore*/}
         {work.description.map((description) => (
          <p
           className='text-pretty font-mono text-sm text-muted-foreground'
           key={description}
          >
           {description}
          </p>
         ))}
        </div>
       </div>
      );
     })}
    </section>
    <section className='flex min-h-0 flex-col gap-y-3'>
     <h2 className='text-xl font-bold'>{education('sectionTitle')}</h2>
     {/*@ts-ignore*/}
     {education.raw('SchoolList').map((education) => {
      return (
       <div key={education.school}>
        <div>
         <div className='flex items-center justify-between gap-x-2 text-base'>
          <h3 className='font-semibold leading-none'>{education.school}</h3>
          <div className='text-sm tabular-nums text-gray-500'>
           {education.startDate} - {education.endDate}
          </div>
         </div>
        </div>
        <span className='mt-2 print:text-[12px] text-pretty font-mono text-sm text-muted-foreground'>
         {education.degree}
        </span>
       </div>
      );
     })}
    </section>
    <section className='flex min-h-0 flex-col gap-y-3'>
     <h2 className='text-xl font-bold'>{languages('sectionTitle')}</h2>
     {/*@ts-ignore*/}
     {languages.raw('LanguageList').map((language) => (
      <p
       className='text-pretty font-mono text-sm text-muted-foreground print:text-[12px]'
       key={language.name}
      >
       {language.name} ({language.level})
      </p>
     ))}
    </section>
   </section>
  </main>
 );
}
