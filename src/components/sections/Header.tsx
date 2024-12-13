import { Button } from '@/components/ui/button';
import type { HeaderProps } from '@/types/cv';
import {
 Github,
 Globe,
 Linkedin,
 Mail,
 MapPin,
 Phone,
 Printer,
} from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

const ICONS = {
 linkedin: <Linkedin className='h-4 w-4' />,
 github: <Github className='h-4 w-4' />,
 globe: <Globe className='h-4 w-4' />,
 mail: <Mail className='h-4 w-4' />,
 phone: <Phone className='h-4 w-4' />,
 location: <MapPin className='h-4 w-4' />,
 print: <Printer className='h-4 w-4' />,
} as const;

export function Header({ header }: HeaderProps) {
 const router = useRouter();
 const pathname = usePathname();

 const toggleLocale = () => {
  const newLocale = pathname.includes('/es') ? 'en' : 'es';
  router.push(`/${newLocale}`);
 };

 return (
  <header className='flex flex-col gap-4'>
   <div className='flex justify-between items-start'>
    <div className='space-y-2'>
     <div className='flex items-center gap-2 justify-between'>
      <h1 className='text-4xl font-bold tracking-tight'>{header('Name')}</h1>
      <div className='flex items-center gap-2'>
       <Button
        variant='outline'
        size='sm'
        className='px-3 py-1 h-auto print:hidden'
        onClick={toggleLocale}
       >
        {pathname.includes('/es') ? 'En' : 'Es'}
       </Button>
       <Button
        variant='default'
        size='sm'
        className='print:hidden flex items-center gap-2 bg-black text-white hover:bg-gray-800'
        onClick={() => window.print()}
       >
        {ICONS.print}
        <span>Print CV</span>
       </Button>
      </div>
     </div>
     <p className='text-base text-muted-foreground'>
      {header.raw('TechStack').join(' | ')}
     </p>
     <div className='flex items-center gap-2 text-muted-foreground'>
      {ICONS.location}
      <span>{header('Contact.City')}</span>
     </div>
    </div>
   </div>

   <div className='flex flex-wrap gap-4 text-muted-foreground text-sm'>
    <a
     href={`mailto:${header('Contact.Email')}`}
     className='flex items-center gap-2'
    >
     {ICONS.mail}
     {header('Contact.Email')}
    </a>
    <span className='text-muted-foreground'>|</span>
    <a
     href={`tel:${header('Contact.Phone')}`}
     className='flex items-center gap-2'
    >
     {ICONS.phone}
     {header('Contact.Phone')}
    </a>
    {header.raw('Links').map((link: any, index: number) => (
     <>
      <span key={`separator-${index}`} className='text-muted-foreground'>
       |
      </span>
      <a
       key={link.url}
       href={link.url}
       target='_blank'
       className='flex items-center gap-2'
       rel='noreferrer'
      >
       {ICONS[link.icon as keyof typeof ICONS]}
       {link.title}
      </a>
     </>
    ))}
   </div>
  </header>
 );
}
