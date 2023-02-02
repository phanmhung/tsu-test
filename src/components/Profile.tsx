import React from 'react';
import { useGetUserQuery } from '../redux/api/userApi';

const Profile: React.FC<{ id: string }> = ({ id }) => {
  const { data, isLoading } = useGetUserQuery(id);
  if (isLoading) return <div>Loading...</div>;
  if (data === undefined) return <div>Something is wrong</div>;
  return (
    <section style={{ backgroundColor: '#9de2ff' }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-8">
            <div className="card" style={{ borderRadius: '15px' }}>
              <div className="card-body p-4">
                <div className="d-flex text-black">
                  <div className="flex-shrink-0">
                    <img
                      src={data.avatar}
                      alt="placeholder"
                      className="img-fluid"
                      style={{ width: '180px', borderRadius: '10px' }}
                    />
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <h5 className="mb-1">
                      {data.lastName} {data.firstName} {data.patronymic}
                    </h5>
                    <p className="mb-2 pb-1" style={{ color: '#2b2a2a' }}>
                      {data.email}
                    </p>
                    <div
                      className="d-flex justify-content-start rounded-3 p-2 mb-2"
                      style={{ backgroundColor: '#efefef' }}
                    >
                      <div>
                        <p className="small text-muted mb-1">О пользователе</p>
                        <p className="mb-0">{data.about !== "" ? data.about : "Nothing about him. Let's update..."}</p>
                      </div>
                    </div>
                    <div className="d-flex pt-1">
                      <button
                        type="button"
                        className="btn btn-outline-primary me-1 flex-grow-1"
                      >
                        Редактировать
                      </button>
                      <button
                        type="button"
                        className="btn btn-primary flex-grow-1"
                      >
                        Удалить
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
