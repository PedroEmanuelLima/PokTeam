import React from "react";
import {
    InputGroup,
    Input,
    Button,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';
import { BsSearch, BsFilterCircleFill } from "react-icons/bs";

import './styles.css';

interface IInpuAndFilter{
    setTypeSelected: React.Dispatch<React.SetStateAction<string>>,
    typeSelected: string,
    typesPokemons: string[],
    searchValue: string,
    setSearchValue:  React.Dispatch<React.SetStateAction<string>>,
    handleSearchPokemon(): Promise<void>,
}

export default function InpuAndFilter({
    setTypeSelected,
    typeSelected,
    typesPokemons,
    searchValue,
    setSearchValue,
    handleSearchPokemon
}: IInpuAndFilter) {

    return (
        <form className="containerInput">
            <InputGroup className="input-goup">
                <Input
                    type="text"
                    placeholder="Nome ou especie"
                    onChange={(event) => setSearchValue(event.target.value)}
                    value={searchValue}
                    className="text-primary"
                />
                <Button
                    type="submit"
                    color="warning"
                    className="btn-search"
                    onClick={(e) => {
                        e.preventDefault();
                        handleSearchPokemon();
                    }}
                >
                    <BsSearch className="icon-search" />
                </Button>
            </InputGroup>

            <UncontrolledDropdown
                className="me-2"
                direction="down"
            >
                <DropdownToggle color="transparent" className="drop-toggle">
                    <BsFilterCircleFill className="icon-filter" />
                </DropdownToggle>
                <DropdownMenu className="menu-dropdown">
                    <DropdownItem
                        className="item-dropdown"
                        onClick={() => setTypeSelected('')}
                    >LIMPAR FILTRO</DropdownItem>
                    {typesPokemons.map((type) => (
                        <div key={type}>
                            <DropdownItem divider />
                            <DropdownItem
                                style={{
                                    backgroundColor: type === typeSelected ? '#2596be' : undefined,
                                    color: type === typeSelected ? 'white' : undefined
                                }}
                                className="item-dropdown"
                                onClick={() => setTypeSelected(type)}
                            >{type}</DropdownItem>
                        </div>
                    ))}
                </DropdownMenu>
            </UncontrolledDropdown>
        </form>
    )
}