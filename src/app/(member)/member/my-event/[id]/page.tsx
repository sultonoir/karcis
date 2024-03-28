import EventClient from "./EventClient";

interface Props {
  params: { id: string };
}

const page = ({ params }: Props) => {
  return <EventClient id={params.id} />;
};

export default page;
