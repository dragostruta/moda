import Image from "next/image";

const Logo = () => {
  return (
    <div className="flex items-center cursor-default">
      <Image src="/images/hanger.svg" width={32} height={32} />
      <p className="ml-2 text-2xl cursor-pointer">
        Moda <strong>SCM</strong>
      </p>
    </div>
  );
};

export default Logo;
