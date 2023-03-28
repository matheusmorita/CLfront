import React from 'react';

import Styles from './styles.module.scss';

export default function TableProjects() {
  return (
    <>
      <main className={Styles.main}>
        <header style={{ background: 'black' }}>eu sou um header</header>
        <table className={Styles.main__table}>
          <thead>
            <tr>
              <th><input type='checkbox' /></th>
              <th>Projeto</th>
              <th>Fase do projeto</th>
              <th>Emissor</th>
              <th>Admin</th>
              <th>Cadastro</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><input type='checkbox' /></td>
              <td>Dado 1A</td>
              <td>Dado 1B</td>
              <td>Dado 1C</td>
              <td>Dado 1D</td>
              <td>Dado 1E</td>
            </tr>
            <tr>
              <td><input type='checkbox' /></td>
              <td>Dado 2A</td>
              <td>Dado 2B</td>
              <td>Dado 2C</td>
              <td>Dado 2D</td>
              <td>Dado 2E</td>
            </tr>
            <tr>
              <td><input type='checkbox' /></td>
              <td>Dado 3A</td>
              <td>Dado 3B</td>
              <td>Dado 3C</td>
              <td>Dado 3D</td>
              <td>Dado 3E</td>
            </tr>
          </tbody>
        </table>
      </main>
    </>
  )
}