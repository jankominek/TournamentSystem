import React from 'react'
import { Button } from '../../components/Button/Button'
import { GameField, TournamentGameFlex, TournamentGameTitle, TournamentGameWrapper, UserGameField } from './TournamentGameModal.styled'

export const TournamentGameModal = ({tournament, onModalClose, 
    onModalSave, saveButtonTitle, closeButtonTitle}) => {

  return (
      <TournamentGameWrapper>
          <TournamentGameTitle>
              Select winner of the match
          </TournamentGameTitle>
          <GameField>
              <UserGameField>A</UserGameField>
              <UserGameField>B</UserGameField>
          </GameField>
        <TournamentGameFlex>
            <Button text={saveButtonTitle} onClick={onModalSave}/>
            <Button text={closeButtonTitle} onClick={onModalClose}/>
        </TournamentGameFlex>
      </TournamentGameWrapper>
  )
}
