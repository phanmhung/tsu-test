import React from "react";
import { User } from "../redux/api/types";
import { useCreateUserMutation } from "../redux/api/userApi";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { initialValues } from "../utils/initialuserValue";
import { Button, Modal } from "react-bootstrap";
import { AddUserSchema } from "../utils/userSchema";

export const AddUserForm: React.FC<{userData:User[] | undefined}> = ({userData}) => {
    const [image, setImage] = React.useState(initialValues.avatar);
    const [images, setImages] = React.useState<string[]>([]);
    const [showModal, setShowModal] = React.useState<boolean>(false);
    const [create, isLoading] = useCreateUserMutation();
    
    React.useEffect(() => {
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
        {({ errors, touched, setFieldValue, isSubmitting }) => {
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
                  className={isLoading ? 'disabled-btn' : ''}
                  disabled={isLoading? true : false}
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
  