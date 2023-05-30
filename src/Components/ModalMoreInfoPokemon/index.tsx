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
import Loading from '../Loading';

interface IModalMoreInfoPokemonProps {
  pokemon: IPokemon | null,
  isOpen: boolean,
  toggleModal: (id: number|null) => void,
  loading: boolean
}

export default function ModalMoreInfoPokemon({
  isOpen,
  toggleModal,
  pokemon,
  loading
}: IModalMoreInfoPokemonProps) {

  return (
    <div>
      <Modal
        isOpen={isOpen}
        toggle={() => toggleModal(null)}
        size='lg' centered
      >
        {
          loading ?
          <ModalBody>
            <Loading />
          </ModalBody> :
          <>
            <ModalHeader toggle={() => toggleModal(null)}>
              {pokemon?.name.toUpperCase()}
            </ModalHeader>

            <ModalBody className=''>
              <div className='d-flex flex-row justify-content-between align-items-center'>
                <img
                  src={pokemon?.image}
                  alt={`imagem do ${pokemon?.name}`}
                  className='img-modal'
                />

                <div className='content-informatio-general'>
                  <div className='d-flex align-items-center informations'>
                    <h4 className='informations-properties'>Especie:</h4>
                    <span className='informations-values'>
                      {pokemon?.species.name || 'Não identificada'}
                    </span>
                  </div>

                  <div className='d-flex align-items-center informations'>
                    <h4 className='informations-properties'>Habitate:</h4>
                    <span className='informations-values'>
                      {pokemon?.species.habitat || "Desconhecido"}
                    </span>
                  </div>

                  <div className='d-flex align-items-center informations'>
                    <h4 className='informations-properties'>Pré-evolução:</h4>
                    <span className='informations-values'>
                      {pokemon?.species.evolves_from_species || "Não possui"}
                    </span>
                  </div>
                  
                  <div className='d-flex align-items-center informations'>
                    <h4 className='informations-properties'>Evolução:</h4>
                    <span className='informations-values'>
                      {pokemon?.evolutionTo==pokemon?.name ?
                        "Não possui" :
                          pokemon?.evolutionTo.map(e => <span className='ms-2'>{e}</span>)}
                    </span>
                  </div>

                  <div className='d-flex align-items-center informations'>
                    <h4 className='informations-properties'>Tipo:</h4>
                    <span className='informations-values'>{pokemon?.types}</span>
                  </div>
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
                <ListGroup horizontal>
                  {pokemon?.abilities.map((ability, index) => (
                    <ListGroupItem key={index} className='informations-values'>
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
          </>
        }
      </Modal>
    </div>
  );
}