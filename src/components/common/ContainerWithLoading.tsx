import Loader from "./Loader";

type Props = {
  children: React.ReactNode;
  isLoading: boolean;
};

export default function ContainerWithLoading({ children, isLoading }: Props) {
  return (
    <div>
      <Loader isLoading={isLoading} />
      {children}
    </div>
  );
}
