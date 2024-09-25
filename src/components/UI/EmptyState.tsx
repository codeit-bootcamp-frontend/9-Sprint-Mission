import EmptyStateImage from "@/images/ui/empty-comments.svg";

interface EmptyStateProps {
  text: string;
  imageComponent?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
}

const EmptyState = ({
  text,
  imageComponent: ImageComponent = EmptyStateImage,
}: EmptyStateProps) => {
  return (
    <div className="m-6 flex flex-col items-center gap-6">
      <ImageComponent />
      <p className="text-gray-400 text-base leading-6">{text}</p>
    </div>
  );
};

export default EmptyState;
