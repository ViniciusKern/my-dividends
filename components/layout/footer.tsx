function AppFooter() {
  return (
    <footer className="bg-gray-100 flex items-center justify-center py-4 border-t border-gray-300">
      <p className="text-gray-600 text-center xs:text-xs">
        © {new Date().getFullYear()} VK SOFTWARE LTDA, All rights reserved.
      </p>
    </footer>
  );
}

export default AppFooter;
