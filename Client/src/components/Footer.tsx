import logo from "../VID-IMG/LOGO.png";
import {
  Footer,
  FooterBrand,
  FooterCopyright,
  FooterDivider,
  FooterIcon,
  FooterLink,
  FooterLinkGroup,
  FooterTitle,
} from "flowbite-react";
import {
  BsDribbble,
  BsFacebook,
  BsGithub,
  BsInstagram,
  BsTwitter,
} from "react-icons/bs";

export default function HomeFooter() {
  return (
    <Footer container>
      <div className="w-full">
        <div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1">
          <div>
            <FooterBrand
              href="/"
              src={logo}
              alt="Volution Wear"
              className="bg-[#0000003e] p-4"
            />
          </div>
          <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6">
            <div>
              <FooterTitle title="about" />
              <FooterLinkGroup col>
                <FooterLink href="https://www.linkedin.com/in/aymane-kabti-52782a304/">
                  Contact us
                </FooterLink>
                <FooterLink href="#">Blog</FooterLink>
              </FooterLinkGroup>
            </div>
            <div>
              <FooterTitle title="Follow us" />
              <FooterLinkGroup col>
                <FooterLink href="https://www.linkedin.com/in/aymane-kabti-52782a304/">
                  Github
                </FooterLink>
                <FooterLink href="#">Discord</FooterLink>
              </FooterLinkGroup>
            </div>
            <div>
              <FooterTitle title="Legal" />
              <FooterLinkGroup col>
                <FooterLink href="#">Privacy Policy</FooterLink>
                <FooterLink href="#">Terms &amp; Conditions</FooterLink>
              </FooterLinkGroup>
            </div>
          </div>
        </div>
        <FooterDivider />
        <div className="w-full sm:flex sm:items-center mt-2 sm:justify-between">
          <FooterCopyright
            href="https://github.com/aymaneKT"
            by="Aymane™ All rights reserved."
            year={2025}
          />
          <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
            <FooterIcon
              href="https://facebook.com/aymane.lqabti"
              icon={BsFacebook}
            />
            <FooterIcon
              href="https://instagram.com/aymane_qabti"
              icon={BsInstagram}
            />
            <FooterIcon href="https://x.com/KabtiAymane" icon={BsTwitter} />
            <FooterIcon href="https://github.com/aymaneKT" icon={BsGithub} />
          </div>
        </div>
      </div>
    </Footer>
  );
}
