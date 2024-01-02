import React from "react";
import "./Detect.css";

function Detect({ columns, data }) {
  return (
    <div className="Detect">
      <table class="board-table">
        <thead>
          <tr>
            <th scope="col" class="th-num">
              NAME
            </th>
            <th>NATIONALITY</th>
            <th scope="col" class="th-title">
              CRIME
            </th>
            <th scope="col" class="th-date">
              TIME
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>KOOJAEWOOK</td>
            <th>KOR</th>
            <th>MONEY LAUNDERING</th>
            <td>2023.05.29,18.05</td>
          </tr>

          <tr>
            <td>SEONG</td>
            <th>KOR</th>

            <th>FRAUD</th>
            <td>2023.05.30.20.07</td>
          </tr>

          <tr>
            <td>UM</td>
            <th>KOR</th>

            <th>FRAUD</th>
            <td>2023.05.30.21.27</td>
          </tr>

          <tr>
            <td></td>
            <th></th>

            <th></th>
            <td></td>
          </tr>

          <tr>
            <td></td>
            <th></th>

            <th></th>
            <td></td>
          </tr>

          <tr>
            <td></td>
            <th></th>

            <th></th>
            <td></td>
          </tr>

          <tr>
            <td></td>
            <th></th>

            <th></th>
            <td></td>
          </tr>

          <tr>
            <td></td>
            <th></th>

            <th></th>
            <td></td>
          </tr>

          <tr>
            <td></td>
            <th></th>

            <th></th>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Detect;
