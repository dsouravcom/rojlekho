const date = new Date();
const year = date.getFullYear();

function Footer() {
  return (
    <div>
      <footer className="bg-white shadow dark:bg-gray-800">
        <div className="flex justify-center items-center h-full p-2 ">
          <span className="text-sm text-gray-600 sm:text-center dark:text-gray-400 text-center">
            © {year}{" "}
            <a href="https://rojlekho.com/" className="hover:underline">
              Roj Lekho™
            </a>
            . All Rights Reserved.
          </span>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
