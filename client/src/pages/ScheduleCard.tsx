import { SectionCard, Schedule } from "../components";
const ScheduleCard = () => {
    return (
        <section id = "schedule" className = "py-24 container mx-auto px-4">
            <h1 className = "text-3xl font-serif font-bold mb-8 text-center text-[#f7879a]"> 
                    Schedule
            </h1>
            <SectionCard>
                <Schedule />
            </SectionCard>
        </section>
    );
}

export default ScheduleCard;