import { RESUME_DATA } from "@/data/resume-data";
import Link from "next/link";

export default function Page() {
	return (
		<main className="container relative mx-auto scroll-my-12 overflow-auto p-4 print:p-12 md:p-16">
			<section className="mx-auto w-full max-w-4xl space-y-8 bg-white print:space-y-4">
				<div className="flex items-center justify-between">
					<header className="flex flex-col gap-4">
						<div className="w-fit">
							<h1 className="text-5xl font-bold">{RESUME_DATA.name}</h1>
						</div>
						<div className="flex flex-wrap gap-1">
							{RESUME_DATA.skills.map((skill) => {
								return (
									<span
										className="print:text-[10px] content-around after:mr-1"
										key={skill}
									>
										{skill}
									</span>
								);
							})}
						</div>
						<span
							className="text-center flex-1 font-mono text-lg text-muted-foreground print:text-[12px]"
							key={RESUME_DATA.location}
						>
							{RESUME_DATA.location}
						</span>
						<div className="flex gap-x-1 pt-1 font-mono text-sm text-muted-foreground print:flex print:text-[12px] justify-between items-center">
							<span>{RESUME_DATA.contact.tel}</span>
							<span>{RESUME_DATA.contact.email}</span>
						</div>
					</header>
				</div>
				<section className="flex flex-col gap-y-3">
					<h2 className="text-xl font-bold">Enlaces</h2>
					<div className="flex flex-1 gap-4 text-center">
						{RESUME_DATA.links.map((link) => (
							<Link href={link.url} key={link.title}>
								{link.title}
							</Link>
						))}
					</div>
				</section>
				<section className="flex min-h-0 flex-col gap-y-3">
					<h2 className="text-xl font-bold">Perfil Profesional</h2>
					{RESUME_DATA.summary.map((summary) => (
						<p
							className="text-pretty font-mono text-sm text-muted-foreground print:text-[12px]"
							key={summary}
						>
							{summary}
						</p>
					))}
				</section>
				<section className="flex min-h-0 flex-col gap-y-3">
					<h2 className="text-xl font-bold">Experiencia</h2>
					{RESUME_DATA.work.map((work) => {
						return (
							<div key={work.company}>
								<div>
									<div className="flex items-center justify-between gap-x-2 text-base">
										<h3 className="inline-flex items-center justify-center gap-x-1 font-semibold leading-none">
											<span className="font-mono text-sm leading-none print:text-[12px]">
												{work.title}
											</span>
											<span className="inline-flex gap-x-1">
												<div className="text-xs print:text-[8px] bg-secondary print:px-1 print:py-0.5 inline-flex items-center rounded-md border px-2 py-0.5 font-semibold font-mono transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-nowrap">
													<span className="text-secondary-foreground">
														{work.badge}
													</span>
												</div>
											</span>
										</h3>
										<div className="text-sm tabular-nums text-gray-500">
											{work.start} - {work.end ?? "Present"}
										</div>
									</div>

									<h4 className="font-mono text-sm leading-none print:text-[12px]">
										{work.company}
									</h4>
								</div>
								<div className="mt-2 text-xs print:text-[10px]">
									{work.description.map((description) => (
										<p
											className="text-pretty font-mono text-sm text-muted-foreground"
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
				<section className="flex min-h-0 flex-col gap-y-3">
					<h2 className="text-xl font-bold">Educación</h2>
					{RESUME_DATA.education.map((education) => {
						return (
							<div key={education.school}>
								<div>
									<div className="flex items-center justify-between gap-x-2 text-base">
										<h3 className="font-semibold leading-none">
											{education.school}
										</h3>
										<div className="text-sm tabular-nums text-gray-500">
											{education.start} - {education.end}
										</div>
									</div>
								</div>
								<span className="mt-2 print:text-[12px] text-pretty font-mono text-sm text-muted-foreground">
									{education.degree}
								</span>
							</div>
						);
					})}
				</section>
				<section className="flex min-h-0 flex-col gap-y-3">
					<h2 className="text-xl font-bold">Idiomas</h2>
					{RESUME_DATA.languages.map((language) => (
						<p
							className="text-pretty font-mono text-sm text-muted-foreground print:text-[12px]"
							key={language}
						>
							{language}
						</p>
					))}
				</section>
			</section>
		</main>
	);
}
