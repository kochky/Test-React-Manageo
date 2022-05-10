import { render, screen,fireEvent,waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'
import PeopleCard from '../components/Card';
import fetchMock from 'jest-fetch-mock'
  
require('jest-fetch-mock').enableMocks()


beforeEach(() => {
    fetchMock.doMock()
    fetch.resetMocks()
})


test('All infos except id are displayed', async () => {
    render(<PeopleCard id={1} lastName={"Martin"} firstName={"Pierre"}  mail={"pierre.martin@manageo.fr"}  />)
    expect(await screen.findByText("Martin")).toBeInTheDocument()
    expect(await screen.findByText("Pierre")).toBeInTheDocument()
    expect(await screen.findByText("pierre.martin@manageo.fr")).toBeInTheDocument()

});

test('a modal open when i click on delete', async () => {
    render(<PeopleCard id={1} lastName={"Martin"} firstName={"Pierre"}  mail={"pierre.martin@manageo.fr"}  />)
    fireEvent.click(screen.getByText('Supprimer'))
    expect(await screen.findByTestId('modal-delete')).toBeInTheDocument()
});



test('When i press "modifier", a modal opens, it contains 3 inputs with data to modify and 2 buttons', async () => {
    render(<PeopleCard id={1} lastName={"Martin"} firstName={"Pierre"}  mail={"pierre.martin@manageo.fr"}  />)
    expect(await screen.findByText("Modifier")).toBeInTheDocument()
    fireEvent.click(await screen.findByText('Modifier'))
    expect(await screen.findByLabelText('Nom')).toBeInTheDocument()
    expect(await screen.findByLabelText('Prénom')).toBeInTheDocument()
    expect(await screen.findByLabelText('Mail')).toBeInTheDocument()
    expect(await screen.findByText("Annuler")).toBeInTheDocument()
    expect(await screen.findByText("Confirmer")).toBeInTheDocument()
});
test('When i cancel delete, the card is still in peopleList component', async () => {
    render(<PeopleCard id={1} lastName={"Martin"} firstName={"Pierre"}  mail={"pierre.martin@manageo.fr"}  />)
    expect(await screen.findByText("Supprimer")).toBeInTheDocument()
    fireEvent.click(await screen.findByText('Supprimer'))
    expect(await screen.findByText("Annuler")).toBeInTheDocument()
    expect(await screen.findByTestId('modal-delete')).toBeInTheDocument()
    fireEvent.click(await screen.findByText('Annuler'))
    expect(await screen.findByText("Martin")).toBeInTheDocument()
});

test('When i cancel delete, the modal closes', async () => {
    render(<PeopleCard id={1} lastName={"Martin"} firstName={"Pierre"}  mail={"pierre.martin@manageo.fr"}  />)
    fireEvent.click(await screen.findByText('Supprimer'))
    fireEvent.click(await screen.findByText('Annuler'))
   await waitFor(()=> expect(screen.queryByTestId('modal-delete')).not.toBeInTheDocument())
});
