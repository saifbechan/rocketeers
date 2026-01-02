import dynamic from 'next/dynamic';
import Image from 'next/image';
import { type ComponentType } from 'react';
import { type IconBaseProps } from 'react-icons';
import rocketeer from './rocketeer.webp';

interface LinkType {
  Icon: ComponentType<IconBaseProps>;
  name: string;
  handle: string;
  href: string;
}

const Contact = () => {
  const links: LinkType[] = [
    {
      Icon: dynamic(async () => (await import('react-icons/fa')).FaGithub),
      name: 'github',
      handle: '@saifbechan',
      href: 'https://github.com/saifbechan',
    },
    {
      Icon: dynamic(async () => (await import('react-icons/fa')).FaLinkedin),
      name: 'linkedIn',
      handle: '/in/saifbechan',
      href: 'https://www.linkedin.com/in/saifbechan/',
    },
  ];

  return (
    <div
      aria-label="Contact information"
      className="absolute right-5 bottom-5 flex gap-6"
    >
      <div className="flex flex-col justify-between">
        {links.map(({ Icon, name, handle, href }: LinkType) => (
          <div key={name} className="flex items-center justify-end gap-1">
            <a href={href} rel="noreferrer" target="_blank">
              {`${name}: ${handle}`}
            </a>
            <Icon className="ml-0.5 cursor-pointer" />
          </div>
        ))}
      </div>
      <div>
        <Image
          alt="Rocketeer"
          height="50"
          priority
          src={rocketeer}
          width="50"
        />
      </div>
    </div>
  );
};

export default Contact;
