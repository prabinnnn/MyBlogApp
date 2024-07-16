import  { memo } from 'react';

function Footer() {
  return (
    <div className="card-footer text-muted text-center font-weight-bolder p-5 m-2">
      Made with &hearts; 
    </div>
  );
}

export default memo(Footer);
