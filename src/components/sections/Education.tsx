import { EducationProps, Education as EducationType } from "@/types/cv";

export function Education({ education }: EducationProps) {
  return (
    <section className="mt-8">
      <h2 className="text-2xl font-semibold tracking-tight mb-6">{education('sectionTitle')}</h2>
      <div className="space-y-4">
        {education.raw('SchoolList').map((edu: EducationType) => (
          <div key={edu.id} className="flex justify-between items-center">
            <div>
              <h3 className="font-medium">{edu.school}</h3>
              <p className="text-muted-foreground">{edu.degree}</p>
            </div>
            <div className="text-sm text-muted-foreground">
              {edu.startDate} - {edu.endDate}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
} 