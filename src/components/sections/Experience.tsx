import { Card } from '@/components/ui/card';
import { MapPin } from 'lucide-react';
import type { ExperienceProps } from '@/types/cv';

export function Experience({ experience }: ExperienceProps) {
 return (
  <section className='space-y-2'>
   <h2 className='text-2xl font-bold'>{experience('sectionTitle')}</h2>
   <Card className='p-6 border border-gray-200'>
    <div>
     {experience.raw('JobList').map((job: any, index: number) => (
      <div key={job.title} className='flex flex-col gap-4'>
       <div className='flex items-start justify-between'>
        <div className='flex flex-col items-start justify-between w-full'>
         <div className='flex items-center gap-2 justify-between w-full'>
          <a
           href={job.link}
           target='_blank'
           className='text-base font-semibold hover:underline underline-offset-4'
           rel='noreferrer'
          >
           {job.company}
          </a>
          <div className='text-sm text-muted-foreground'>
         <span>
          {job.startDate} - {job.endDate}
         </span>
        </div>
         </div>
         <div className='flex gap-1 w-full justify-between'>
          <div className='flex gap-2 items-center'>
            <h3 className='text-[15px] font-medium'>{job.title}</h3>
            <span className='inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-800 w-fit'>
             {job.badge}
            </span>
          </div>
          <div className='flex items-center gap-1 text-muted-foreground text-sm'>
            <MapPin className='h-3 w-3' />
            <span>{job.location}</span>
          </div>
         </div>
        </div>
       </div>
       <ul className='list-disc list-inside space-y-1.5 text-muted-foreground text-sm'>
        {job.description.map((item: string, index: number) => (
         <li key={index} className='pl-2'>
          {item.replace('✣ ', '')}
         </li>
        ))}
       </ul>
       {index < experience.raw('JobList').length - 1 && (
        <hr className='border-gray-200 dark:border-gray-700 mt-4 mb-4' />
       )}
      </div>
     ))}
    </div>
   </Card>
  </section>
 );
}
