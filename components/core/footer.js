import Image from "next/image";

const Footer = () => {
  return (
    <div className="grid grid-rows-3 px-20">
      <div className="flex items-center justify-center pt-4 cursor-default">
        <Image src="/images/hanger.svg" width={32} height={32} />
        <p className="ml-2 text-2xl">
          Moda <strong>SCM</strong>
        </p>
      </div>
      <div className="text-xs flex items-center justify-center cursor-default">
        @2022 - Moda SCM. All rights reserved.
      </div>
    </div>
  );
};

export default Footer;
