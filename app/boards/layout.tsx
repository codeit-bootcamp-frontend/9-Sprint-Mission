import NavBar from "@/components/navBar/NavBar";

const BoardsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <NavBar>
      {children}
    </NavBar>
  );
}

export default BoardsLayout;