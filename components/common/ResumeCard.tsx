"use client";

import Link from "next/link";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Loader2, MoreVertical } from "lucide-react";
import { useRouter } from "next-nprogress-bar";
import { deleteResume } from "@/lib/actions/resume.actions";
import { useToast } from "../ui/use-toast";
import { usePathname } from "next/navigation";

const ResumeCard = ({
  resume,
  refreshResumes,
}: {
  resume: any;
  refreshResumes: () => void;
}) => {
  if (!resume) {
    return (
       //! The fallback skeleton now has a cleaner loading state with animate-pulse for smooth loading feedback.
      <div className="bg-slate-200/30 relative aspect-[1/1.2] rounded-lg shadow-lg flex flex-col animate-pulse">
        <div className="flex-1"></div>
        <div className="border-0 p-3 flex justify-between bg-white/40 rounded-b-lg">
          ‎{" "}
        </div>
      </div>
    );
  }

  const router = useRouter();
  const pathname = usePathname();
  const myResume = JSON.parse(resume);
  const [openAlert, setOpenAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const onDelete = async () => {
    setIsLoading(true);

    const result = await deleteResume(myResume.resumeId, pathname);

    setIsLoading(false);
    setOpenAlert(false);

    if (result.success) {
      toast({
        title: "Information saved.",
        description: "Resume was successfully deleted.",
        className: "bg-white",
      });

      refreshResumes();
    } else {
      toast({
        title: "Uh Oh! Something went wrong.",
        description: result?.error,
        variant: "destructive",
        className: "bg-white",
      });
    }
  };

  return (
     //! Changed the hover:scale-105 with tranform duration-300 easin-in-out to make scaling effect smoother
    <div className="relative aspect-[1/1.2] flex flex-col hover:scale-105 transition-transform duration-300 ease-in-out rounded-lg shadow-lg">
      <Link
        href={"/my-resume/" + myResume.resumeId + "/view"}
        className="flex-grow"
      >
        <div
          className="bg-gradient-to-b from-pink-100 via-purple-200 to-blue-200 rounded-t-lg border-t-4 h-full"
          style={{
            borderColor: myResume?.themeColor,
          }}
        >
          <div className="flex size-full items-center justify-center">
            <img src="/img/blank-cv.png" width={80} height={80} 
            className="object-contain"
            alt="Resume Preview"
            />
          </div>
        </div>
      </Link>

      <div className="border p-3 flex justify-between items-center bg-white rounded-b-lg shadow-md">
         {/* resume title is truncated if it exceeds the available width,make sure the layout dont break for long title */}
       
        <h2 className="text-sm font-medium text-slate-700 truncate w-3/">
          {myResume.title}
        </h2>

        <DropdownMenu>
          <DropdownMenuTrigger>
            {/* Hover:text-slate-900 */}
            <MoreVertical className="h-5 w-5 cursor-pointer text-slate-700 hover:text-slate-900"/>
            
          </DropdownMenuTrigger>

          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={() =>
                router.push("/my-resume/" + myResume.resumeId + "/edit")
              }
            >
              Edit
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() =>
                router.push("/my-resume/" + myResume.resumeId + "/view")
              }
            >
              View
            </DropdownMenuItem>

            <DropdownMenuItem onClick={() => setOpenAlert(true)}>
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <AlertDialog open={openAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our server.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => setOpenAlert(false)}
              disabled={isLoading}
              className="no-focus"
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={onDelete} disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 size={20} className="animate-spin" /> &nbsp; Deleting
                </>
              ) : (
                "Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ResumeCard;
