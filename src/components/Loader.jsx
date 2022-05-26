import RingLoader from 'react-spinners/RingLoader';

export default function Loader() {
  return (
    <div className="sweet-loading text-center">
      <RingLoader color="teal" loading="true" css="" size={70} />
    </div>
  );
}
