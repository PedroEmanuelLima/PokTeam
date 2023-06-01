import React, { useContext } from 'react';
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
import { TeamContext } from '../../context/team.context';
import StatusComponent from '../StatusComponent';

interface IModalMoreInfoPokemonProps {
  pokemon: IPokemon | null,
  isOpen: boolean,
  toggleModal: (id: number | null) => void,
  loading: boolean
}

export default function ModalMoreInfoPokemon({
  isOpen,
  toggleModal,
  pokemon,
  loading
}: IModalMoreInfoPokemonProps) {

  const { team, removePokemon, addPokemon } = useContext(TeamContext);

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
                        {pokemon?.evolutionTo === pokemon?.name ?
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

                <div className='container-status-info'>
                  {pokemon?.stats
                    .sort((a, b) => a.name.length - b.name.length)
                    .map((status) => <StatusComponent
                      status={status.name}
                      value={status.base_stat}
                    />)
                  }
                </div>
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
                {pokemon && 
                  <Button
                    className={`${team.some((p) => p.id === pokemon.id) ? 'bg-danger' : 'bg-success'}`}
                    onClick={() => team.some((p) => p.id === pokemon.id) ? removePokemon(pokemon) : addPokemon(pokemon)}
                  >
                    {team.some((p) => p.id === pokemon.id) ? 'Remover do Time' : 'Adicionar ao Time'}
                  </Button>
                }
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