import { XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  FileUploadItem,
  FileUploadItemDelete,
  FileUploadItemMetadata,
  FileUploadItemPreview,
  FileUploadList,
  useFileUpload,
} from "@/components/ui/file-upload";

export function FileUploadGalleryContent({
  className,
}: {
  className?: string;
}) {
  const files = useFileUpload((state) => Array.from(state.files.keys()));

  return (
    <FileUploadList className={className}>
      {files.map((file, index) => (
        <FileUploadItem
          className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200"
          key={`${index}-${file.name}`}
          value={file}
        >
          <FileUploadItemPreview className="h-32 w-full object-cover" />
          <FileUploadItemMetadata className="w-full flex-1 space-y-1 overflow-hidden" />
          <FileUploadItemDelete asChild>
            <Button
              className="absolute top-1 right-1 cursor-pointer opacity-0 group-hover:opacity-100"
              size="sm"
              type="button"
              variant="destructive"
            >
              <XIcon size={16} />
            </Button>
          </FileUploadItemDelete>
        </FileUploadItem>
      ))}
    </FileUploadList>
  );
}

export function FileUploadListContent({ className }: { className?: string }) {
  const files = useFileUpload((state) => Array.from(state.files.keys()));

  return (  
    <FileUploadList className={className}>
      {files.map((file, index) => (
        <FileUploadItem key={`${index}-${file.name}`} value={file}>
          <FileUploadItemPreview />
          <FileUploadItemMetadata />
          <FileUploadItemDelete asChild>
            <Button
              className="cursor-pointer"
              size="sm"
              type="button"
              variant="ghost"
            >
              <XIcon size={16} />
            </Button>
          </FileUploadItemDelete>
        </FileUploadItem>
      ))}
    </FileUploadList>
  );
}
