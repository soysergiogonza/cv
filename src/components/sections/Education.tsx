import type { EducationProps, Education as EducationType } from '@/types/cv';

export function Education({ education }: EducationProps) {
 return (
  <section className='mt-8'>
   <h2 className='text-2xl font-semibold tracking-tight mb-6'>
    {education('sectionTitle')}
   </h2>
   <div className='space-y-6'>
    {education.raw('SchoolList').map((edu: EducationType) => (
     <div key={edu.id} className='space-y-2'>
      <div className='flex justify-between items-start'>
       <div>
        <h3 className='font-medium'>{edu.school}</h3>
        <p className='text-muted-foreground'>{edu.degree}</p>
       </div>
       <div className='text-sm text-muted-foreground whitespace-nowrap'>
        {edu.startDate} - {edu.endDate}
       </div>
      </div>
      {edu.description && (
       <div className='space-y-2 text-sm text-muted-foreground'>
        <p className='leading-relaxed'>
         {edu.description.split('Proyecto destacado:')[0]}
        </p>
        {edu.description.includes('Proyecto destacado:') && (
         <p className='leading-relaxed'>
          <span className='font-medium'>Proyecto destacado: </span>
          {edu.description.split('Proyecto destacado:')[1]}
         </p>
        )}
       </div>
      )}
     </div>
    ))}
   </div>
  </section>
 );
}
