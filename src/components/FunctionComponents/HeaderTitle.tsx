import { Link } from 'react-router-dom';
interface HeaderTitleProps {
  textHeader: string;
  HeaderTitle: string;
  pathLink: string;
}
export const HeaderTitle = (props: HeaderTitleProps) => {
  const { textHeader, HeaderTitle, pathLink } = props;
  return (
    <div className="enslaved-header" style={{ color: '#000000' }}>
      <Link
        to={`/${pathLink}`}
        style={{
          textDecoration: 'none',
          color: textHeader ? '#000000' : '#ffffff',
        }}
      >
        {HeaderTitle}
      </Link>
      {textHeader && <span className="enslaved-title">:</span>}
      <div className="enslaved-header-subtitle">{textHeader}</div>
    </div>
  );
};
