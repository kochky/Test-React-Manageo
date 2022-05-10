import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'
import PeopleList from '../components/PeopleList';
import fetchMock from 'jest-fetch-mock'
  
require('jest-fetch-mock').enableMocks()

beforeEach(() => {
    fetchMock.doMock()
    fetch.resetMocks()
  })

test("fetch people data and display it, a loading message before it", async () => {
    fetch.mockResponseOnce(JSON.stringify({"data":[{
        "id": 1,
        "firstName": "Pierre",
        "lastName": "Martin",
        "mail": "pierre.martin@manageo.fr"
    }] }))
    render(<PeopleList />)
    expect(await screen.findByTestId('loading')).toBeInTheDocument()
    expect(await screen.findByText("Martin")).toBeInTheDocument()
});


test('Message when there is no people to display', async () => {
    fetch.mockResponseOnce(JSON.stringify({"data":[]} ))
    render(<PeopleList />)
    expect(await screen.findByText("Aucune personne trouvée !")).toBeInTheDocument()
});

test('Error message when fetch failed', async () => {
    fetch.mockAbortOnce()
    render(<PeopleList />)
    expect(await screen.findByText("Erreur")).toBeInTheDocument()
});



test('When i confirm delete, the card disappear from peopleList component', async () => {
    fetch.mockResponseOnce(JSON.stringify({"data":[{
        "id": 1,
        "firstName": "Pierre",
        "lastName": "Martin",
        "mail": "pierre.martin@manageo.fr"
    }] }))
    render(<PeopleList />)
    fireEvent.click(await screen.findByText('Supprimer'))  
    fireEvent.click(await screen.findByText('Confirmer'))
    expect(await screen.findByText("Aucune personne trouvée !")).toBeInTheDocument()
});

test('When i confirm delete, the modal closes', async () => {
    fetch.mockResponseOnce(JSON.stringify({"data":[{
        "id": 1,
        "firstName": "Pierre",
        "lastName": "Martin",
        "mail": "pierre.martin@manageo.fr"
    }] }))
    render(<PeopleList />)
    fireEvent.click(await screen.findByText('Supprimer'))
    fireEvent.click(await screen.findByText('Confirmer'))
    await waitFor(()=> expect(screen.queryByTestId('modal-delete')).not.toBeInTheDocument())
});

test('When i press "modifier", then cancel, the modal opens then closes', async () => {
    fetch.mockResponseOnce(JSON.stringify({"data":[{
        "id": 1,
        "firstName": "Pierre",
        "lastName": "Martin",
        "mail": "pierre.martin@manageo.fr"
    }] }))
    render(<PeopleList />)
    fireEvent.click(await screen.findByText('Modifier'))
    await waitFor(()=> expect(screen.queryByTestId('modal-modify')).toBeInTheDocument())
    fireEvent.click(await screen.findByText('Annuler'))
    await waitFor(()=> expect(screen.queryByTestId('modal-modify')).not.toBeInTheDocument())
});

test('When i press "modifier", then confirm, the modal opens then closes', async () => {
    fetch.mockResponseOnce(JSON.stringify({"data":[{
        "id": 1,
        "firstName": "Pierre",
        "lastName": "Martin",
        "mail": "pierre.martin@manageo.fr"
    }] }))
    render(<PeopleList />)
    fireEvent.click(await screen.findByText('Modifier'))
    await waitFor(()=> expect(screen.queryByTestId('modal-modify')).toBeInTheDocument())
    fireEvent.click(await screen.findByText('Confirmer'))
    await waitFor(()=> expect(screen.queryByTestId('modal-modify')).not.toBeInTheDocument())
});

test('When i press "modifier", and change the email value, the value must be a email ', async () => {
    fetch.mockResponseOnce(JSON.stringify({"data":[{
        "id": 1,
        "firstName": "Pierre",
        "lastName": "Martin",
        "mail": "pierre.martin@manageo.fr"
    }] }))
    render(<PeopleList />)
    fireEvent.click(await screen.findByText('Modifier'))
    fireEvent.change(await screen.getByTestId("content-input"), {target: {value:'not a mail'}})
    fireEvent.click(await screen.findByText('Confirmer'))
    expect(await screen.findByText("Doit être une adresse mail")).toBeInTheDocument()
    fireEvent.change(await screen.getByTestId("content-input"), {target: {value:'mail@mail.fr'}})
    fireEvent.click(await screen.findByText('Confirmer'))
    await waitFor(()=> expect(screen.queryByText("Doit être une adresse mail")).not.toBeInTheDocument())
});
test('When i press "modifier", and change the input values, the datas in the card change', async () => {
    fetch.mockResponseOnce(JSON.stringify({"data":[{
        "id": 1,
        "firstName": "Pierre",
        "lastName": "Martin",
        "mail": "pierre.martin@manageo.fr"
    }] }))
    render(<PeopleList />)
    fireEvent.click(await screen.findByText('Modifier'))
    fireEvent.change(await screen.findByLabelText('Nom'), {target: {value: 'Lucas'}})
    fireEvent.click(await screen.findByText('Confirmer'))
    expect(await screen.findByText("Lucas")).toBeInTheDocument()

});

test('When i press "modifier", and change the input values, the value must not be empty', async () => {
    fetch.mockResponseOnce(JSON.stringify({"data":[{
        "id": 1,
        "firstName": "Pierre",
        "lastName": "Martin",
        "mail": "pierre.martin@manageo.fr"
    }] }))
    render(<PeopleList />)
    fireEvent.click(await screen.findByText('Modifier'))
    fireEvent.change(await screen.findByLabelText('Nom'), {target: {value: ''}})
    fireEvent.click(await screen.findByText('Confirmer'))
    expect(await screen.findByText("Ne peut être vide")).toBeInTheDocument()

});




