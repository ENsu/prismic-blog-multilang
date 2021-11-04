// truncated code
import NextLink from 'next/link'
import { linkResolver } from 'prismicConfiguration'

const AltLangs = ({ altLangs = [] }) =>
  altLangs.map((altLang) => {
    return (
      <li className="language-switcher" key={altLang.id}>
        <NextLink
          locale={altLang.lang}
          href={linkResolver(altLang)}
          passHref
        >
          <a>{`Go to ${altLang.lang} version`}</a>
        </NextLink>
      </li>
    );
  });

const LangSwitcher = ({ altLangs }) => <AltLangs altLangs={altLangs} />

export default LangSwitcher;