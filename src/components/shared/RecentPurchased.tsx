import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface Recent {
  id: string;
  eventTitle: string | null | undefined;
  userName: string | null | undefined;
  userImage: string | null | undefined;
  ticketTotal: number;
  createdAt: Date;
}

interface Props {
  recent: Recent;
}

export default function RecentPurchased({ recent }: Props) {
  return (
    <div className="flex items-center">
      <Avatar className="h-9 w-9">
        <AvatarImage src={recent.userImage ?? "logo.png"} alt="Avatar" />
        <AvatarFallback>SD</AvatarFallback>
      </Avatar>
      <div className="ml-4 space-y-1">
        <p className="text-sm font-medium leading-none">{recent.userName}</p>
        <p className="text-sm text-muted-foreground">{recent.eventTitle}</p>
      </div>
      <div className="ml-auto font-medium">{recent.ticketTotal} ticket</div>
    </div>
  );
}
