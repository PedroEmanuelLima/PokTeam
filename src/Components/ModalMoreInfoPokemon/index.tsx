import React from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Table,
  ListGroup,
  ListGroupItem
} from 'reactstrap';
import { IPokemon } from '../../base/Interfaces';
import './style.css'

interface IModalMoreInfoPokemonProps {
  pokemon: IPokemon | null,
  isOpen: boolean,
  toggleModal: (id: number|null) => void
}

export default function ModalMoreInfoPokemon({ isOpen, toggleModal, pokemon }: IModalMoreInfoPokemonProps) {

  return (
    <div>
      <Modal
        isOpen={isOpen}
        toggle={() => toggleModal(null)}
        size='lg' centered
      >
        <ModalHeader toggle={() => toggleModal(null)}>{pokemon?.name.toUpperCase()}</ModalHeader>

        <ModalBody className=''>
          <div className='d-flex flex-row justify-content-between align-items-center'>
            <img
              src={pokemon?.image}
              alt={`imagem do ${pokemon?.name}`}
              className='img-modal'
            />

            <div className='content-informatio-general'>
              <p className='d-flex align-items-center informations'>
                <h4 className='informations-properties'>Especie:</h4>
                <span className='informations-values'>{pokemon?.species.name}</span>
              </p>

              <p className='d-flex align-items-center informations'>
                <h4 className='informations-properties'>Habitate:</h4>
                <span className='informations-values'>
                  {pokemon?.species.habitat || "Desconhecido"}
                </span>
              </p>

              <p className='d-flex align-items-center informations'>
                <h4 className='informations-properties'>Pré-evolução:</h4>
                <span className='informations-values'>
                  {pokemon?.species.evolves_from_species || "Não possui"}
                </span>
              </p>
              
              <p className='d-flex align-items-center informations'>
                <h4 className='informations-properties'>Evolução:</h4>
                <span className='informations-values'>
                  {pokemon?.evolutionTo==pokemon?.name ? "Não possui" : pokemon?.evolutionTo}
                </span>
              </p>

              <p className='d-flex align-items-center informations'>
                <h4 className='informations-properties'>Tipo:</h4>
                <span className='informations-values'>{pokemon?.types}</span>
              </p>
            </div>
          </div>

          <Table
            bordered
            hover
          >
            <thead>
              <tr>
                {pokemon?.stats.map((status) => <th>{status.name}</th>)}
              </tr>
              <tr>
                {pokemon?.stats.map((status) => <th>{status.base_stat}</th>)}
              </tr>
            </thead>
          </Table>

          <div>
            <h4 className='informations-properties'>Habilidades:</h4>
            <ListGroup horizontal dark>
              {pokemon?.abilities.map(ability => (
                <ListGroupItem className='informations-values'>
                  {ability}
                </ListGroupItem>
              ))}
            </ListGroup>
          </div>
        </ModalBody>

        <ModalFooter className='justify-content-between'>
          <Button color="success" onClick={() => toggleModal(null)}>
            Adicionar aou time
          </Button>
          <Button color="secondary" onClick={() => toggleModal(null)}>
            Fechar
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}