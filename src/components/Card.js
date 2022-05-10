import  React, {useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import Fade from '@mui/material/Fade';
import Backdrop from '@mui/material/Backdrop';
import SettingsIcon from '@mui/icons-material/Settings';
import ClearIcon from '@mui/icons-material/Clear';
import { CSSTransition } from 'react-transition-group';
import '../style/card.scss'

const style = {
  position: 'absolute' ,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 375,
  bgcolor: 'background.paper',
  border: '0px solid #000',
  boxShadow: 24,
  p: 4,
};

function PeopleCard ({id,lastName,firstName,mail,setPeopleList}) {
  const nodeRef = React.useRef(null)
  
  //Sert pour contrôler le formulaire, et les valeurs inputs seront stockées dedans avant d'être vérifié pendant le submit
  const [newLastName,setNewLastName]=useState(lastName)
  const [newFirstName,setNewFirstName]=useState(firstName)
  const [newMail,setNewMail]=useState(mail)

 //Stock les messages d'errreur si les valeurs d'input sont vides ou erronées
  const [errorLastName,setErrorLastName]=useState()
  const [errorFirstName,setErrorFirstName]=useState()
  const [errorMail,setErrorMail]=useState()

  //Sert à l'animation de suppression de la card
  const [deletedCard,setDeletedCard]=useState(false)

  //gère ouverture/fermeture modale suppression
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //gère ouverture/fermeture modale modifier
  const [openModify, setOpenModify] = React.useState(false);
  const handleOpenModify = () => setOpenModify(true);
  const handleCloseModify = () => setOpenModify(false);

  //Formulaire contrôlé, on récupère les modifications dans un state local
  const handleChangeLastName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewLastName(event.target.value);
    setErrorLastName()

  };
  const handleChangeFirstName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewFirstName(event.target.value);
    setErrorFirstName()

  };
  const handleChangeMail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewMail(event.target.value);
    setErrorMail()
  };

  //ferme la modale de suppression, lance l'animation de suppression, et supprime du state la personne
  function handleClickRemove(){
    handleClose()
    setDeletedCard(true)
    setTimeout(()=> setPeopleList(prevState=> prevState.filter((people)=>people.id !== id)),500)
  }

  //ferme la modale pour modifier et modifie les infos de la personne après confirmation
  function handleClickModify(){
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    //Enlève les message d'erreur dès que l'user saisit dans le input
    setErrorFirstName()
    setErrorLastName()
    setErrorMail()
    //Check les inputs. Ils ne doivent pas être vides, et l'email doit être au bon format
    if(newFirstName.trim()==='' ) {
      setErrorFirstName('Ne peut être vide')
    }else if ( newLastName.trim() ==='') {
      setErrorLastName('Ne peut être vide')
    }else if (!re.test(newMail)) {
      setErrorMail('Doit être une adresse mail')
    }else {   
        const peopleModified={
          id:id,
          firstName:newFirstName,
          lastName:newLastName,
          mail:newMail
        }
        //modifie le state si les inputs sont bons et ferme la modale
        setPeopleList(prevState=> prevState.map((people)=>(people.id === id )? (peopleModified):(people) ))
        handleCloseModify()}
      }

  return (
    <>
    <CSSTransition
      nodeRef={nodeRef}
      in={!deletedCard}
      timeout={400}
      classNames="alert"
      unmountOnExit
    >
      <div ref={nodeRef}className='card-wrapper'>
        <Card id={id} className="card" sx={{ maxWidth: 345, maxHeight:355,minHeight:355}}>
          <CardMedia
            component="img"
            alt="movie picture"
            height="140"
            image="https://images.unsplash.com/photo-1544502062-f82887f03d1c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1559&q=80"
          />
          <CardContent className="card__first-content">
            <Typography gutterBottom variant="h5" component="div">
              {lastName} 
            </Typography>
            <Typography gutterBottom variant="h5" component="div">
              {firstName} 
            </Typography>
            <Typography variant="body2" color="text.secondary">
            {mail}
            </Typography>
          </CardContent>

          <CardActions className='card__buttons-container'>
            <Button color="secondary" size="small" onClick={handleOpen}><ClearIcon/>Supprimer</Button>
            <Button color="primary" size="small" onClick={handleOpenModify}><SettingsIcon/>Modifier</Button>

          </CardActions>
        </Card>
  
        <Modal
          data-testid="modal-delete"
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade  in={open}>
            <Box className="modal"sx={style}>
              <Typography id="transition-modal-title" variant="h6" component="h2">
              Confirmer la suppression de "{lastName} {firstName}"
              </Typography>
              <div className="modal__buttons-container">
                <Button color="secondary" size="small" onClick={handleClose}>Annuler</Button>
                <Button color="primary" size="small" onClick={handleClickRemove}>Confirmer</Button>
              </div>
            </Box>
          </Fade>
        </Modal>    

         <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={openModify}
          onClose={handleCloseModify}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade data-testid="modal-modify" in={openModify}>
            <Box className="modal"sx={style}>
              <TextField fullWidth margin="normal" error={errorLastName?true :false} onChange={handleChangeLastName} defaultValue={lastName} id="outlined-basic" label="Nom" variant="outlined" helperText={errorLastName}/>
              <TextField fullWidth margin="normal" error={errorFirstName?true:false} onChange={handleChangeFirstName} defaultValue={firstName} id="outlined-basic" label="Prénom" variant="outlined" helperText={errorFirstName}/>
              <TextField  inputProps={{ "data-testid": "content-input" }} fullWidth margin="normal" error={errorMail ? true:false} onChange={handleChangeMail} defaultValue={mail} id="outlined-basic" label="Mail" variant="outlined" helperText={errorMail} />
              <div className="modal__buttons-container">
                <Button color="secondary" size="small" onClick={handleCloseModify}>Annuler</Button>
                <Button color="primary" size="small" onClick={handleClickModify}>Confirmer</Button>
              </div>
            </Box>
          </Fade>
        </Modal>

      </div>
    </CSSTransition> 
    </>)
  
}

export default PeopleCard