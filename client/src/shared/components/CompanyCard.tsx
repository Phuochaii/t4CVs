import { useNavigate } from 'react-router-dom';

const name = ({ company }) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const navigation = useNavigate();
  return (
    <div
      onClick={() => navigation(`/companies/${company.id}`)}
      className="item relative  h-[400px] rounded-[5px] mb-6 overflow-hidden border hover:border-green-600 hover:border-2 hover:bg-[#e7e7e75b]"
    >
      <div className="absolute left-4 h-16 w-16 rounded-[5px] top-[120px] overflow-hidden border border-[#EEE] z-10 ">
        <img
          src={company.image}
          alt="mini logo"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      </div>
      <div className="cursor-pointer banner h-[150px] overflow-hidden  mb-6">
        <img
          src={company.image}
          alt="company banner"
          style={{
            height: '100%',
            width: '100%',
            objectFit: 'cover',
          }}
        />
      </div>
      <div className="px-5 mt-12">
        <div className="name font-bold cursor-pointer">{company.name}</div>
        <div className="mt-4">
          <span className="line-clamp-6">" {company.description} "</span>{' '}
        </div>
      </div>
    </div>
  );
};

export default name;
