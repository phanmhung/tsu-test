import { ErrorMessage, Field, Form, Formik } from 'formik';
import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useGetAllMailQuery } from '../redux/api/userApi';
import { AddUserSchema } from '../utils/userSchema';
import { User } from '../redux/api/types';

const initialValues = {
  avatar: 'https://random.dog/3fd9df57-037e-41c1-935e-ed1efa45dd76.jpg',
  firstName: '',
  lastName: '',
  patronymic: '',
  email: '',
  about: '',
};

const useEmailUniquenessValidation = () => {
  //get all mails
  const [allMails, setAllMails] = React.useState<string[]>([]);
  const {data: existingMails,isLoading:loadingMail} = useGetAllMailQuery();
  React.useEffect(() => {
    if (existingMails && !loadingMail) {
      setAllMails(existingMails);
    }
  }, [existingMails,loadingMail]);
  
  return AddUserSchema.test('email-unique', 'Email already exists', (value:any) =>allMails.indexOf(value.email) === -1);
};
export const AddUserForm: React.FC<{
  handleSubmit: (arg: any) => Promise<void>;
  inputInitialValues?: User;
}> = ({ handleSubmit,inputInitialValues }) => {

  const [image, setImage] = React.useState(inputInitialValues ? inputInitialValues.avatar : initialValues.avatar);
  const [images, setImages] = React.useState<string[]>([]);
  const [showModal, setShowModal] = React.useState<boolean>(false);

  React.useEffect(() => {
    //Fetch 5 random images
    const promises = [];
    for (let i = 0; i < 8; i++) {
      promises.push(
        fetch('https://random.dog/woof.json')
          .then((response) => response.json())
          .then((data) => data.url)
      );
    }
    Promise.all(promises).then((data) => {
      setImages(data);
    });
  }, []);

  return (
    <Formik
      initialValues={inputInitialValues ? inputInitialValues:initialValues}
      validationSchema={useEmailUniquenessValidation()}
      onSubmit={(values) => handleSubmit(values)}
      //pass userData to validationSchema
      validateOnMount={false}
      validateOnChange={false}
      validateOnBlur={true}
    >
      {({ errors, touched, setFieldValue, isSubmitting }) => {
        return (
          <div className="container">
            <h5>Add fields to continue</h5>
            <Form>
              <div className="form-group">
                <label>Аватар</label>
                <Field
                  type="hidden"
                  name="avatar"
                  id="avatar"
                  placeholder="avatar"
                  onChange={(e: any) => {
                    setFieldValue('avatar', e.currrentTarget.value);
                  }}
                />
                <ErrorMessage
                  name="avatar"
                  component="span"
                  className="error"
                />
                <br />
                <img src={image} width={200} height={200} alt="avatar" />
                <br />
                <Button variant="primary" onClick={() => setShowModal(true)}>
                  Выбрать аватар
                </Button>
                <br />

                <Modal show={showModal} onHide={() => setShowModal(false)}>
                  <Modal.Header closeButton>
                    <Modal.Title>Выберите аватар</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    {images.length > 0 &&
                      images.map((img, index) => (
                        <img
                          key={index}
                          src={img}
                          alt="preview"
                          width={100}
                          height={100}
                          onClick={() => {
                            setImage(img);
                            setFieldValue('avatar', img);
                          }}
                          className={ image === img ? 'rounded-circle' : ''}
                        />
                      ))}
                  </Modal.Body>
                  <Modal.Footer>
                    <Button
                      variant="secondary"
                      onClick={() => setShowModal(false)}
                    >
                      Закрыть
                    </Button>
                  </Modal.Footer>
                </Modal>
              </div>
              <div className="form-row">
                <Field
                  type="firstName"
                  name="firstName"
                  id="firstName"
                  placeholder="Фамилия"
                  className={
                    errors.firstName && touched.firstName ? 'input-error' : null
                  }
                />
                <ErrorMessage
                  name="firstName"
                  component="span"
                  className="error"
                />
              </div>
              <div className="form-row">
                <Field
                  type="lastName"
                  name="lastName"
                  id="lastName"
                  placeholder="Имя"
                  className={
                    errors.lastName && touched.lastName ? 'input-error' : null
                  }
                />
                <ErrorMessage
                  name="lastName"
                  component="span"
                  className="error"
                />
              </div>
              <div className="form-group">
                <Field
                  type="patronymic"
                  name="patronymic"
                  id="patronymic"
                  placeholder="Отчество"
                  className={
                    errors.patronymic && touched.patronymic
                      ? 'input-error'
                      : null
                  }
                />
              </div>
              <div className="form-group">
                <Field
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Почта"
                  className={
                    errors.email && touched.email ? 'input-error' : null
                  }
                />
                <ErrorMessage name="email" component="span" className="error" />
              </div>
              <div className="form-group">
                <Field
                  type="about"
                  name="about"
                  id="about"
                  placeholder="О пользователе"
                  className={
                    errors.about && touched.about ? 'input-error' : null
                  }
                />
              </div>
              <button
                type="submit"
                className={`${isSubmitting ? 'disabled-btn' : ''} mt-2`}
                disabled={isSubmitting}
              >
                Save
              </button>
            </Form>
          </div>
        );
      }}
    </Formik>
  );
};
