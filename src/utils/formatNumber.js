import { interfaceDeclaration } from '@babel/types';
import { replace } from 'lodash';
import numeral from 'numeral';
import { $CombinedState } from 'redux';
import { isEmpty } from './isEmpty';
import { useSelector } from "react-redux"

// ----------------------------------------------------------------------

export function fCurrency(number) {
  return numeral(number).format(Number.isInteger(number) ? '0,0' : '0,0.00');
}

export function fFcfa(number) {
  return `${fNumber(number)} FCFA`;
}

export function fPercent(number) {
  return numeral(number / 100).format('0.0%');
}

export function fNumber(number) {
  return numeral(number).format();
}

export function fShortenNumber(number) {
  return replace(numeral(number).format('0.00a'), '.00', '');
}

export function fData(number) {
  return numeral(number).format('0.0 b');
}

export function sumData(table, key) {

  if (!isEmpty(table)) {
    let total = 0;

    table.forEach((tab) => total += tab + `.${key}`)

    return total

  } else {

    return 0
  }

}

export function toPercent(data, constant) {

  return (constant * 100) / data

}

export function sizeDatas(datas) {

  let size = 0

  datas.forEach((data) => size += 1)

  return size
}

export function evaluate(evaluation) {
  let total = 0;
  let count = 0;

  evaluation.forEach((eva) => {

    total += parseFloat(eva.note)
    count += 1

  })


  return (total / count)

}

const verifyCommande = (commande = {}) => commande.admin_solved == "0" || commande.user_solved == "0" && commande.reverse == "0" ? 1 : 0


export const sizeNewCommande = (commandes = []) => {
  let newCommandeNumber = 0

  for (let counter in commandes) {

    !isEmpty(commandes) && verifyCommande(commandes[counter]) ? newCommandeNumber += 1 : newCommandeNumber = newCommandeNumber

  }

  return newCommandeNumber
}

export const sumAccountAdmin = (commandes = []) => {
  let inAccount = 0

  commandes.forEach((commande) => {
    inAccount += !verifyCommande(commande) && commande.reverse == "0" ? parseInt(commande.price) : 0
  })

  return inAccount
}

export const getIfInCard = async (id, cards) => {
  let essist = false

  if (!isEmpty(cards)) {
    cards ?? cards.map((card) => {
      if (card.pId === id) {
        essist = true
      }
    })
  }

  return essist
}
