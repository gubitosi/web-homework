import React, { Fragment, useState } from 'react'
import gql from 'graphql-tag'
import { Mutation, Query } from 'react-apollo'
import { css } from '@emotion/core'
export function Transactions () {
  const TRANSACTIONS = gql`
    query GetTransactions {
      transactions {
        id
        amount
        credit
        debit
        description
        merchant_id
        user_id
        date
      }
    }
  `

  const DELETE_TRANSACTION = gql`
      mutation ($id: String) {
        deleteTransaction(id: $id) {
          id
        }
      }
    `

  const ADD_TRANSACTION = gql`
    mutation ($amount: Float, $credit: Boolean, $date: Date, $debit: Boolean, $description: String, $merchant_id: String, $user_id: String) {
      addTransaction(amount: $amount, credit: $credit, date: $date, debit: $debit, description: $description, merchant_id: $merchant_id, user_id: $user_id) {
        id
      }
    }
  `

  const EDIT_TRANSACTION = gql`
    mutation ($amount: Float, $credit: Boolean, $date: Date, $debit: Boolean, $description: String, $id: String, $merchant_id: String, $user_id: String) {
      editTransaction(amount: $amount, credit: $credit, date: $date, debit: $debit, description: $description, id: $id, merchant_id: $merchant_id, user_id: $user_id) {
        id
      }
    }
  `

  const [editingTransaction, setEditingTransaction] = useState('')

  return (
    <Fragment>
      <h2 className='text-center'>Transactions</h2>
      <br />
      <Query query={TRANSACTIONS}>
        {({ loading, error, data }) => {
          if (loading) return <div>Loading...</div>
          if (error) return <div>Error :(</div>
          let trs = []
          data.transactions.forEach(transaction => {
            trs.push(<tr>
              <td>{transaction.date}</td>
              <td>{transaction.user_id}</td>
              <td>${parseFloat(transaction.amount).toFixed(2)}</td>
              <td>{transaction.credit ? 'Credit' : 'Debit'}</td>
              <td>{transaction.description}</td>
              <td>{transaction.merchant_id}</td>
              <td><button className='btn btn-primary ml-2' css={buttonStyle} data-target='#editModal' data-toggle='modal' onClick={() => setEditingTransaction(transaction)} type='button'>Edit</button></td>
              <td>
                <Mutation mutation={DELETE_TRANSACTION}>
                  {(deleteTransaction, { data, loading, error }) => (
                    /* eslint-disable-next-line no-undef */
                    <button className='btn btn-danger' css={buttonStyle} disabled={loading} onClick={e => deleteTransaction({ variables: { id: transaction.id } }).then(() => location.reload())} type='button'>Delete</button>
                  )}
                </Mutation>
              </td>
            </tr>)
          })

          return (
            <Fragment>
              <table className='table table-striped table-hover text-center border' css={tableStyle}>
                <thead css={tableHeadStyle}>
                  <tr>
                    <th scope='col'>Date</th>
                    <th scope='col'>User Name</th>
                    <th scope='col'>Amount</th>
                    <th scope='col'>Type</th>
                    <th scope='col'>Description</th>
                    <th scope='col'>Merchant Name</th>
                    <th scope='col'>Edit</th>
                    <th scope='col'>Delete</th>
                  </tr>
                </thead>
                <tbody className='border-0'>
                  {trs}
                </tbody>
              </table>
              <br />
            </Fragment>
          )
        }}
      </Query>
      <h2 className='text-center'>Add New Transaction</h2>
      <br />
      <Mutation mutation={ADD_TRANSACTION}>
        {(addTransaction, { data, loading, error }) => (
          <form className='form w-50 m-auto' onSubmit={e => {
            e.preventDefault()
            addTransaction(
              {
                variables: {
                  amount: parseFloat(e.target.inputAmount.value),
                  credit: e.target.selectType.value === 'Credit',
                  date: e.target.inputDate.value,
                  debit: e.target.selectType.value === 'Debit',
                  description: e.target.inputDescription.value,
                  merchant_id: e.target.selectMerchant.value,
                  user_id: e.target.selectUser.value
                }
              })
              .then(() => {
                /* eslint-disable-next-line no-undef */
                location.reload()
              })
              .catch(err => {
                console.log(err)
              })
          }}>
            <div className='form-group'>
              <label htmlFor='inputDate'><strong>Date</strong></label>
              <input className='form-control' id='inputDate' placeholder='Date' required type='date' />
            </div>
            <div className='form-group'>
              <label htmlFor='selectUser'><strong>User</strong></label>
              <input className='form-control' id='selectUser' placeholder='User' required type='text' />
            </div>
            <div className='form-group'>
              <label htmlFor='inputAmount'><strong>Amount ($)</strong></label>
              <input className='form-control' data-number-to-fixed='2' id='inputAmount' min='0' placeholder='Amount in USD' required step='0.01' type='number' />
            </div>
            <div className='form-group'>
              <label htmlFor='selectType'><strong>Card Type</strong></label>
              <select className='form-control' id='selectType' required>
                <option defaultValue>Debit</option>
                <option>Credit</option>
              </select>
            </div>
            <div className='form-group'>
              <label htmlFor='inputDescription'><strong>Description</strong></label>
              <input className='form-control' id='inputDescription' placeholder='Description' type='text' />
            </div>
            <div className='form-group'>
              <label htmlFor='selectMerchant'><strong>Merchant</strong></label>
              <input className='form-control' id='selectMerchant' placeholder='Merchant' required type='text' />
            </div>
            <div className=' w-50 m-auto'>
              <button className='btn btn-success w-100 m-auto' type='submit'>Add</button>
            </div>
          </form>
        )}
      </Mutation>
      <div aria-hidden='true' aria-labelledby='editModalLabel' className='modal fade' id='editModal' role='dialog' tabIndex='-1'>
        <div className='modal-dialog' role='document'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title' id='editModalLabel'>Edit Transaction</h5>
              <button aria-label='Close' className='close' data-dismiss='modal' type='button'>
                <span aria-hidden='true'>&times;</span>
              </button>
            </div>
            <div className='modal-body'>
              <Mutation mutation={EDIT_TRANSACTION}>
                {(editTransaction, { data, loading, error }) => (
                  <form className='form w-50 m-auto' onSubmit={e => {
                    e.preventDefault()
                    editTransaction(
                      {
                        variables: {
                          amount: parseFloat(e.target.inputAmount.value),
                          credit: e.target.selectType.value === 'Credit',
                          date: e.target.inputDate.value,
                          debit: e.target.selectType.value === 'Debit',
                          description: e.target.inputDescription.value,
                          id: editingTransaction.id,
                          merchant_id: e.target.selectMerchant.value,
                          user_id: e.target.selectUser.value
                        }
                      })
                      .then(() => {
                        /* eslint-disable-next-line no-undef */
                        location.reload()
                      })
                      .catch(err => {
                        console.log(err)
                      })
                  }}>
                    <div className='form-group'>
                      <label htmlFor='inputDate'><strong>Date</strong></label>
                      <input className='form-control' defaultValue={editingTransaction.date} id='inputDate' placeholder='Date' required type='date' />
                    </div>
                    <div className='form-group'>
                      <label htmlFor='selectUser'><strong>User</strong></label>
                      <input className='form-control' defaultValue={editingTransaction.user_id} id='selectUser' placeholder='User' required type='text' />
                    </div>
                    <div className='form-group'>
                      <label htmlFor='inputAmount'><strong>Amount ($)</strong></label>
                      <input className='form-control' data-number-to-fixed='2' defaultValue={editingTransaction.amount} id='inputAmount' min='0' placeholder='Amount in USD' required step='0.01' type='number' />
                    </div>
                    <div className='form-group'>
                      <label htmlFor='selectType'><strong>Card Type</strong></label>
                      <select className='form-control' defaultValue={editingTransaction.credit ? 'Credit' : 'Debit'} id='selectType' required>
                        <option defaultValue>Debit</option>
                        <option>Credit</option>
                      </select>
                    </div>
                    <div className='form-group'>
                      <label htmlFor='inputDescription'><strong>Description</strong></label>
                      <input className='form-control' defaultValue={editingTransaction.description} id='inputDescription' placeholder='Description' type='text' />
                    </div>
                    <div className='form-group'>
                      <label htmlFor='selectMerchant'><strong>Merchant</strong></label>
                      <input className='form-control' defaultValue={editingTransaction.merchant_id} id='selectMerchant' placeholder='Merchant' required type='text' />
                    </div>
                    <div className='w-100 m-auto'>
                      <button className='btn btn-success w-100 m-auto' type='submit'>Save Changes</button>
                    </div>
                  </form>
                )}
              </Mutation>
            </div>
            <div className='modal-footer'>
              <button className='btn btn-secondary' data-dismiss='modal' type='button'>Close</button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

const buttonStyle = css`
  width: 75px;
`
const tableHeadStyle = css`
  background: #02306d;
  color: #fff;
`
const tableStyle = css`
  background: #fff;
`
