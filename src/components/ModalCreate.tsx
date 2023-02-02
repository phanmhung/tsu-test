import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import * as Yup from 'yup';
import { User } from '../redux/api/types';
import { useCreateUserMutation } from '../redux/api/userApi';

const initialValues = {
    avatar: 'https://random.dog/3fd9df57-037e-41c1-935e-ed1efa45dd76.jpg',
    firstName: '',
    lastName: '',
    patronymic: '',
    email: '',
    about: '',
  };
  
const AddUserSchema = Yup.object().shape({
  avatar: Yup.string().required('Avatar is required'),

  firstName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Firstname is required'),

  lastName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Lastname is required'),
  patronymic: Yup.string(),

  email: Yup.string().email().required('Email is required'),
  about: Yup.string(),
});

const AddUserForm: React.FC<{userData:User[] | undefined}> = ({userData}) => {
  const [image, setImage] = React.useState(initialValues.avatar);
  const [images, setImages] = React.useState<string[]>([]);
  const [showModal, setShowModal] = React.useState<boolean>(false);
  const [create, isLoading] = useCreateUserMutation();
  
  useEffect(() => {
    //Fetch 5 random images
    const promises = [];
    for (let i = 0; i < 5; i++) {
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

  const handleSubmit = async (value: any) => {
    try{
        //check if email is unique
        const isUnique = userData?.find((u) => u.email === value.email);
        if (isUnique) {
            throw new Error('Email already exists');
        }
        //save user
        await create(value);
        window.location.reload();
    }
    catch(error){
        console.log(error);
    }
  }
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={AddUserSchema}
      onSubmit={(values) => handleSubmit(values)}
      //pass userData to validationSchema
        validateOnMount={false}
        validateOnChange={false}
        validateOnBlur={false}
        
    >
      {({ errors, touched, isValid, dirty, setFieldValue, isSubmitting }) => {
        return (
          <div className="container">
            <h1>Add fields to continue</h1>
            <Form>
              <div className="form-row">
                <label>Аватар</label>
                <Field
                  type="hidden"
                  name="avatar"
                  id="avatar"
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
                <label>Фамилия</label>
                <Field
                  type="firstName"
                  name="firstName"
                  id="firstName"
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
                <label>Имя</label>
                <Field
                  type="lastName"
                  name="lastName"
                  id="lastName"
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
              <div className="form-row">
                <label htmlFor="patronymic">Отчество</label>
                <Field
                  type="patronymic"
                  name="patronymic"
                  id="patronymic"
                  className={
                    errors.patronymic && touched.patronymic
                      ? 'input-error'
                      : null
                  }
                />
              </div>
              <div className="form-row">
                <label htmlFor="email">Почта</label>
                <Field
                  type="email"
                  name="email"
                  id="email"
                  className={
                    errors.email && touched.email ? 'input-error' : null
                  }
                />
                <ErrorMessage name="email" component="span" className="error" />
              </div>
              <div className="form-row">
                <label>О пользователе</label>
                <Field
                  type="about"
                  name="about"
                  id="about"
                  className={
                    errors.about && touched.about ? 'input-error' : null
                  }
                />
              </div>
              <button
                type="submit"
                className={isSubmitting ? 'disabled-btn' : ''}
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

function ModalCreate({
  show,
  onHide,
  listUser,
}: {
  show: boolean;
  onHide: () => void;
  listUser?: User[];
}) {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Modal title</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <AddUserForm userData={listUser}/>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalCreate;
