import NavBar from "@/components/navBar/NavBar";

const AddBoardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <NavBar>
      <div className="p-6 my-24 flex flex-col space-y-6 justify-center lg:w-[1200px] lg:m-auto lg:my-24 lg:p-0">
        {children}
      </div>
    </NavBar>
  );
}

export default AddBoardLayout;