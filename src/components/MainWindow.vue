<template>

  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>e-portiernia - uwaga</title>
    <link rel="stylesheet" href="mainWindow.css">
    <GoogleFonts />

  </head>

  <body>
    <nav>
      <div class="main-nav">
        <WUoT_Logo />
        <button class="logOut">
          <span class="userbutton">
            <span class="avatars">
              <span class="userinitials">SH</span>
            </span>
          </span> Wyloguj</button>
      </div>
    </nav>

    <div class="main-page">
      <div class="left-action-buttons">
        <ul class="sidebar">
          <li class="option">
            <RouteButton routeName="ScanConciergeCard" class="giveItem" buttonText="Wydaj/Odbierz">
              <template #icon>
                <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink">
                  <rect width="60" height="60" fill="url(#pattern0_352_1443)" />
                  <defs>
                    <pattern id="pattern0_352_1443" patternContentUnits="objectBoundingBox" width="1" height="1">
                      <use xlink:href="#image0_352_1443" transform="scale(0.01)" />
                    </pattern>
                    <image id="image0_352_1443" width="100" height="100"
                      xlink:href="data:image/png;base64,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" />
                  </defs>
                </svg>
              </template>
            </RouteButton>
          </li>
          <li class="option">
            <RouteButton routeName="UnauthorizedUserGiveItem" class="giveItemWithoutAU"
              buttonText="Wydaj/Odbierz bez autoryzacji">
              <template #icon>
                <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink">
                  <rect width="60" height="60" fill="url(#pattern0_324_781)" />
                  <defs>
                    <pattern id="pattern0_324_781" patternContentUnits="objectBoundingBox" width="1" height="1">
                      <use xlink:href="#image0_324_781" transform="scale(0.01)" />
                    </pattern>
                    <image id="image0_324_781" width="100" height="100"
                      xlink:href="data:image/png;base64,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" />
                  </defs>
                </svg>
              </template>
            </RouteButton>
          </li>
          <li class="option">
            <RouteButton class="checkReservations" routeName="CheckReservations"
              buttonText="Wydaj/Odbierz bez autoryzacji">
              <template #icon>
                <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink">
                  <rect width="60" height="60" fill="url(#pattern0_323_37)" />
                  <defs>
                    <pattern id="pattern0_323_37" patternContentUnits="objectBoundingBox" width="1" height="1">
                      <use xlink:href="#image0_323_37" transform="scale(0.01)" />
                    </pattern>
                    <image id="image0_323_37" width="100" height="100"
                      xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAAES0lEQVR4nO2dy6tWVRTAd3ojjbhhovawUYNIMge+cuIfYDqsMCsaNLEmkiHp5Ipv0AxBlFJnQqRUk4xwVNOiQV0bdUfdfKBmXrr54tZPNh0h5Hznnn0ee6+99/rBgQsX1j5r/djft8/a55zPGEVRFEVRFEVRFEVRMgGYCawCtgGfA78A14A7xWH/Plf8byvwIjAj9HknB/A0sA/4HXfGgb3AwtB5RA8wD/gYuE17bgNHgLmh84oS4DXgD7rnKvBq6PyiAXgQOEb/HAWGQucrGuBh4Gv88ZUdM3TekmdGExljwJniGGsoZSh0/uJo8DH1BfB8SZzFwJeOsY6EyVoowAbHAr5XI+Zmx5iv+Mk2jqWty2rqkEPsww5xrwCPmdwprjPqYsUNO8R+tLh6r8vhiljPEJapojPxVmfFL0lyoeNF3ycNxjjhEP8W8FRFrB+RQT9SinaICxsbjPGO4xh7KmLZ/pgEzrUu/oBGoWtvakODcV53HOO3QQ1J4AVkMNWJhPuSs11bV95vMM6WBuOsGBBrCLiJADqRcF9ytoXuyjcNxjnbYJwPKuJ9jwBaCyhJzO5ZNFlpLHYYYwnwT4NxTlfEfBc45ekY9ynEbiQ14Qdgdo34s1usin42AiikeBPSprX+LTC/IvYC4LsW8a+YDIW03XS6DuwElgKPFMcyYBcw0TL2LZOhEBGrlQH8bTIUch65jJsMhYwil59MhkI+RS4nTYZCXPcrfLLJZChkJXJZbnITUgz4K/IYAx4wmQrZjTx2GCGEEPKEXfMjh5vAkyZXIcWgB5HDASOIUELmAhcJz8Wq+37tzRUIojchRbJrQycIvFRxfo8DN8hFSJH0RwHzOzjNuX2IMHwImWE3hgLkdqrqoR77JQ9MIou/ehdSJD/Ls5TTwEM97Gz2zVkvQv43Uw54SGr/dI+7AeuRx7Wye5p7x37J9tSiPw+sqTlbj3vcP5/usM3Ykaob+XoHmNODkDnBEkqBrm0YRYUkhc4QYagQYaiQTIXw32s4Qi9tp1v2bg/+RgqPQl4mDv50ub+5c7rOxsQvxG/rpKRQXTKRiBA/zcUBheqKCfs9kYiQcBe4PmRYVEhNfMiwqJCa+JAhlSA3OdQ4qSxlpCYkehmpCTlmEoCEhFj2mchJTUj0UlIUErWUVIVEKyVlIVFKSV1IdFJyEDJiIiJ1ISMmMlIWMmIiJFUh22uMsQj4TMC+ebjXM9XFg4zngEtEhp/qlxest48p4FngAhHip/rlReuluQgMC3m2UcZLMOvS8y7hRuBf4mPUT/XLi9aUSWB1jfhvN3wvY0je8FP98oK1YcK+jjaRmTJVvKfyTT+VH1ystkzWmSmKPyEWldIVdMekzpSe2wcNON7FOWUPsK7lBdxleyNc9oXs4Ylclx9/uYedYfNURvjZcllnhZzZorNCyGzRWSHkV97u7R/od4WiKIqiKIqiKIqiKEYudwGadC7LL4Gb5gAAAABJRU5ErkJggg==" />
                  </defs>
                </svg>
              </template>
              Sprawdź rezerwacje
            </RouteButton>
          </li>
        </ul>
      </div>
      <div class="">
        <div class="navigtionButtons">
          <RouteButton class="showMap" routeName="Mapa" buttonText="Mapa">
            <template #icon>
            </template>
          </RouteButton>

          <div class="itemTypesButtons">
            <button class="microphones"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white"
                class="bi bi-mic-fill" viewBox="0 0 16 16">
                <path d="M5 3a3 3 0 0 1 6 0v5a3 3 0 0 1-6 0z" />
                <path
                  d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5" />
              </svg></button>
            <button class="remote-controllers"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                fill="white" class="bi bi-file-spreadsheet" viewBox="0 0 16 16">
                <path
                  d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v4h10V2a1 1 0 0 0-1-1zm9 6h-3v2h3zm0 3h-3v2h3zm0 3h-3v2h2a1 1 0 0 0 1-1zm-4 2v-2H6v2zm-4 0v-2H3v1a1 1 0 0 0 1 1zm-2-3h2v-2H3zm0-3h2V7H3zm3-2v2h3V7zm3 3H6v2h3z" />
              </svg></button>
            <button class="keys"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white"
                class="bi bi-key-fill" viewBox="0 0 16 16">
                <path
                  d="M3.5 11.5a3.5 3.5 0 1 1 3.163-5H14L15.5 8 14 9.5l-1-1-1 1-1-1-1 1-1-1-1 1H6.663a3.5 3.5 0 0 1-3.163 2M2.5 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
              </svg></button>
          </div>
          <div class="itemsVersionsButtons">
            <button class="primary-version"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="white"
                class="bi bi-1-circle-fill" viewBox="0 0 16 16">
                <path
                  d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M9.283 4.002H7.971L6.072 5.385v1.271l1.834-1.318h.065V12h1.312z" />
              </svg></button>
            <button class="reserve-version"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="white"
                class="bi bi-2-circle-fill" viewBox="0 0 16 16">
                <path
                  d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M6.646 6.24c0-.691.493-1.306 1.336-1.306.756 0 1.313.492 1.313 1.236 0 .697-.469 1.23-.902 1.705l-2.971 3.293V12h5.344v-1.107H7.268v-.077l1.974-2.22.096-.107c.688-.763 1.287-1.428 1.287-2.43 0-1.266-1.031-2.215-2.613-2.215-1.758 0-2.637 1.19-2.637 2.402v.065h1.271v-.07Z" />
              </svg></button>
          </div>
        </div>
        <div class="itemsTable">
          <div class="itemsNumber">
            <table>
              <tbody>
                <tr class="table-row">
                  <td class="table-cell">90 <svg width="29" height="26" viewBox="0 0 29 26" fill="none"
                      xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                      <rect x="0.987305" y="0.9375" width="27.5187" height="24.5438" fill="url(#pattern0_108_1673)" />
                      <defs>
                        <pattern id="pattern0_108_1673" patternContentUnits="objectBoundingBox" width="1" height="1">
                          <use xlink:href="#image0_108_1673" transform="matrix(0.005 0 0 0.00560606 0 -0.060606)" />
                        </pattern>
                        <image id="image0_108_1673" width="200" height="200"
                          xlink:href="data:image/png;base64,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" />
                      </defs>
                    </svg>
                  </td>
                  <td class="table-cell">91 <svg width="29" height="26" viewBox="0 0 29 26" fill="none"
                      xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                      <rect x="0.987305" y="0.9375" width="27.5187" height="24.5438" fill="url(#pattern0_108_1673)" />
                      <defs>
                        <pattern id="pattern0_108_1673" patternContentUnits="objectBoundingBox" width="1" height="1">
                          <use xlink:href="#image0_108_1673" transform="matrix(0.005 0 0 0.00560606 0 -0.060606)" />
                        </pattern>
                        <image id="image0_108_1673" width="200" height="200"
                          xlink:href="data:image/png;base64,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" />
                      </defs>
                    </svg>
                  </td>
                  <td class="table-cell">92 <svg width="29" height="26" viewBox="0 0 29 26" fill="none"
                      xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                      <rect x="0.987305" y="0.9375" width="27.5187" height="24.5438" fill="url(#pattern0_108_1673)" />
                      <defs>
                        <pattern id="pattern0_108_1673" patternContentUnits="objectBoundingBox" width="1" height="1">
                          <use xlink:href="#image0_108_1673" transform="matrix(0.005 0 0 0.00560606 0 -0.060606)" />
                        </pattern>
                        <image id="image0_108_1673" width="200" height="200"
                          xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAAAXNSR0IArs4c6QAAERhJREFUeF7tnVtTFMkWhQtHEPAK0nhhREfx3Yd58o/7Q9TQ0XBmcEJEEGQUUGGcOvFlnPS0c4auNqvy0rVXRXR0Q3de9tp7VV5WVuZUpUsICIETEZgSNkJACJyMgAii6BACIxAQQRQeQkAEUQwIgTAE1IKE4aZURhAQQYw4WmaGISCChOGmVEYQEEGMOFpmhiEggoThplRGEBBBjDhaZoYhIIKE4aZURhAQQYw4WmaGISCChOGmVEYQEEGMOFpmhiEggoThplRGEBBBjDhaZoYhIIKE4aZURhAQQYw4WmaGISCChOGmVEYQEEGMOFpmhiEggoThplRGEBBBjDhaZoYhIIKE4aZURhAQQYw4WmaGISCChOGmVEYQEEGMOFpmhiEggoThplRGEBBBjDhaZoYhIIKE4aZURhAQQYw4WmaGISCChOGmVEYQEEGMOFpmhiEggoThplRGEBBBjDhaZoYhIIKE4aZURhAQQYw4WmaGISCChOGmVEYQEEGMOFpmhiEggoThplRGEBBBjDhaZoYhIIKE4aZURhAQQYw4uhQz5+bm6i9fvlRTU1NfXz/88EO1v79fZCwWWalSnKl6dIPAwsJCfXh4WM3MzFRnz56tTp06VUESXufOnas+fPhQff78uTo+Pua9qJgsqjLduEO5lILAyspK/eeff1ZnzpypZmdnXbU+fvzoyODJsr+/Xx0cHFTT09PVwsJC9ddff1V7e3vFEEUEKSWaelYPyPHmzZtqcXGxOjo6coEPKYaJAlkgxenTp113ixaE199//+1ee3t72eMzewV6Fhcyp6qqwWBQQwjI8enTp6qua0cQWg7eIQREgTBv376t5ubmKsYhfE/3i78hDGlpXXJ2u0QQhXSnCKyurtbc/Xd3d123iYDn5Qfl/m/GH5CF7hfvXHzHZ1ocPvPd+fPnqxcvXvB1lljNUminHlFmxSBw5coV13IQ/AS2bz3aVJBBPV018tve3k4er8kLbAOW0paLwOzsbH316lU3COfF3d8PxtvUmm7Yu3fvKvL+7bffksdr8gLbgKW0ZSIwPT1dX7x40Y0dGDPQxYIgvDP+aHtBtMFg4MYr79+/TxqzSQtrC5TSl4cAA/L5+XnXrYIcEIK7PmMILj++CK05+TKA52JMs7W1RVnJ4jZZQaEAKV25CEAOiMCsFEIgZED4gyT8zcCcoG5zQRBaI8jHeISW6pdffkkWt8kKagOS0paHwPXr191sFTNOXP5OT+vhp3N9y9K29hAQ8jHoX1paqv74449krYgI0tZ7BtPfuXOn3tzcrCCAD15g8NO0XhTke+78bS66V5CPcsgLAiImphqLiCBtvGcw7dmzZ2tEPj8g9+uq6EoRxAQvF58J7LaDdPKh5eDdd9cYrB8fHyeJ3SSFGIyjXpocQ+cYByjfeqDMs06LsQ2zWs+fP48ev9ELGAcA/aZ8BGLpHE2W00LRzaIVoXvFO3+zhuvFixfR4zd6AU0A6PvyEYitc4xCwC9TobvGpIAf69CCPHnyJHr8Ri+gfPerhqMQiK1zNKHvV/n68QetB4P1Dx8+JIndJIU0gaDvy0Qghc7RZDkEQVPxq38Z9DODlmrxogjS5CGj36fUOUZBDEH86l5mztBYdnZ2RBCjcVmE2Sl1jiaDvZLO4BxFHbLwOjg4SHJzT1JIEwj6vhwEUuscTZbTYly+fLni0V3GH3SxdnZ2ksVtsoKagND3+RHIoXPQhfIzVHyGBMxcQQS/GhiSLC8vu9W8qQbn3hsiSP64LKIGuXQOv5QEMkAQvwrYP5fO4JzuFSSiJUn9TIgIUkR45q1ETp0DUtBa8Po3gkAYWpDV1dXq8ePHyeM1eYF5Q0Gl/xOB3DoHCxuHn1f3nz1pGJBfu3aNJe7JZq6GMRJBDHOmBJ1jeJdF7wq/wBGy8AzIy5cvs5AjW6GGY7IY00vROfyYww/K/cDctyS7u7tZb+JZCy8mWoxVpCSdwxMEFwzPZrGCd2trK3t8Zq+AsdjMbm5pOoefvRoGhnVXiILr6+vZ4zN7BbJHjKEKlKhzQBCmb9n7im4V2/s8e/asmLgspiKG4jSLqaXqHGzCsL297TaGo1v16tUrpnyLictiKpIlaowUWrLOwSO6dKcgB8cgpFpjNa7rRZBxkZrQ35WucyACXrhwwbUiR0dHxcVjcRWa0DgsstqToHOwj9bGxkayTRi+11EiyPciNiG/l87RjaNEkG5wLCoX6RzduUME6Q7LInKaFJ1jc3NzImJvIipZRORNQCWkc3TvJBGke0yz5CidIw7sIkgcXJPmKp0jHtwiSDxsk+QsnSMuzCJIXHyj5i6dIyq8LnMRJD7GUUqQzhEF1v/LVARJg3OnpUjn6BTOkZmJIOmw7qQk6RydwDh2JiLI2FDl/6F0jvQ+EEHSYx5UonSOINhaJxJBWkMYPwPpHPExPqkEESQf9mOVLJ1jLJii/UgEiQZt+4ylc7THsG0ORRPk5s2bNTvr+TO4X79+XXR92zpjOL10ji7RDM+ruIA7deqUO6Ce55TZ7YKNi/0Rwzyeubu763b9XllZ4QH/4uof7or/pZTO0QWK3eRRVIAxU3P9+nXXYvAAP7vt8Ugmn9nDlZ0vIA6k+fjxoyNK6u3wu4H95Fykc8RG+PvyL4Igi4uLNbtaDG99DyEgAP8fdbF36/r6Oj8pwpbvg//bX0vnaINenLTZg2phYaGGGP6Fmf5sCN45P2LU9f79++rHH390LczLly+z2xPqJukcocjFTZctoOhKMABnyxd21HNNwH/f/e7e/syIURAMd7nm5+c5hSibTaGuks4Rilz8dNmCaW1trWbQzXhimBDDRPGHq4yCAVIwcOcEVMjC+GWSZrukc8QP8jYlZCHITz/9VL9+/bpi20m6Ub5bNWzI8Lb4owxksD4YDNzRwHTHeEGUjY2NLLZ9jzOkc3wPWnl+mzyIVldX63fv3rkZKe78vLdpQSAS4w/IxkErnEa0v7/vSPLmzZvk9o3rRukc4yKV93fJA+jChQs13aq1tbWvO3q3gcDn9fjxY0cOWiQIQkvCd6Xt9Yqt0jnaeDxt2qQEmZqaqm/duuU0jMPDw2pmZubr4Y2hg3RERLprbJvP+MMf6UWrgobC+dr7+/tJ7RzlQukcaQO8bWnJAufMmTP10tJSxbQs3SoIQnD77lVbQ05KzyzZr7/+6vgXq4xx85XOMS5S5fwuWdDMzMzUly5dct0exD3eaUG448e8Dg4Oqhs3brijhHOeWCSdI6aX4+WdjCBzc3M1XR66PhCDgPXTsvHMq1wrhd7CiynhHAN36RwxPRw37yQEuXfvXv377787YvgLgvgxSEwTISFTwHS1ICjjn5Q6iXSOmN6Nn3cSgqB77O3tubs507J0q7ijpyAI5dC1Y0qZFsTrKyk2T5bOET+AY5eQhCC3b9+uOaRxdnbWTb8yFUtXK1UXi1aDiQEOamHdFhMFkDXmMcPSOWKHbpr8kxDk559/rh89euS6OFzMXNGKQBiIEvOCHHfv3q0ePnxYXblyxRXFBAHLWNBLPn/+3DkG0jliejRt3p0Hx0nVn5+frxkHQAgIwjsEiT2LRUvBGAQRkRktT0zeacFQ9bvUSaRzpA3g2KUlIwgNB08BItwxJiBYuZqWs8cGoEudRDpHbG+lzz8ZQZjm5W6+vLzszsJmTMDfzGblvLrSSaRz5PRivLKTEQQTlpeX3cNR9P0XFhZcK+JnleKZODrnLnQS6Ry5vBe/3KQEwZyVlZWad6ZfvRYS38yTS2irk0jnyOm9+GUnJwgzPLQg6CKszcrdxWqjk7AtETNiPDfP2jK/QJJJCP5mpowWKublF2f6pzH9LCHv/K/0c8hjYtNF3skJQqXZpIFgYk3W8fFxF3YE50EAh+gk165dq5lwYCaOy+/d5ZfRYB/CZOxZuuEHy/yz/P5RZQiyu7ubxcfBDiksYRbwlpaW3C4mtB65Z7GadBIIxDRwXdf11NTU1Pnz52uCHgIsLi66u7TXcvzDW369GQTxs3Wx/D48hqNekIQ6gW9MITSWPaXlm4UggMBuJgRQ7i5Wk05CV5BW4v79+9WDBw/cs+90DdFPaC1oAQlMv7mdbxEJUP4fezm/J8RwYFGXFEtpSgvmGPXJRhBPEv9sCHc9loBwV6ZV4TMD6NgBFgPULvMEl+GWAWxoNcDFd6nYgZKlPPyWB8eePXuW1a9d2p87r+xA8pyIV9i9oyEGz5i/ffv2mxXAucHKUT6EGCbI8OZ6EASctre3na5Eq4XGRG8wR137WGYRQKJA02IgItJ/Z1Ehn4f7930Efxyb/NZHfuD9T4LQpeOGAjnYorXEZ/DHsbPU3xRBEMC5ceNGzYCWMQndLJzN3XN4+rJUEGPWixsGGPCCHP4zhOEFXrTAtCJHR0fF+DMmJinzLgpQWhIczuCdAfDW1pb7bPmSzpHX+0URBCgQ3zY3Nx1BWNTINKzlSzpHXu8XRxDguHr1KprD16XxeSHKW7p0jrz4F0kQIGF2C72BpSCWL+kceb1fLEGABTGx7zqJdI68BGgqvWiC+JakzzqJdI6mEM37ffEEAZ4+6yTSOfISoKn0iSBIn3US6RxNIZr3+4khiG9J+qaTSOfIS4Cm0ieKIH3USaRzNIVo3u8njiB900mkc+QlQFPpE0mQPukk0jmaQjTv9xNLkEnRSaRz5A3wtqVPNEEmQSeRztE2RPOmn3iClK6TSOfIG+BtS+8FQUrWSaRztA3RvOl7Q5BSdRLpHHkDvG3pvSJIiTqJdI62IZo3fe8IUppOIp0jb4C3Lb2XBClJJ5HO0TZE86bvLUFS6SRNOge7jvDgF5sq0JpwkM/Tp097jXvekO629N47Kva+W006Bw98sb8Xz7Sw4yFbGn358qX3uHcbpvlyM+GomM+TNOkcPDLMdqV+36ouj3vLFzZ2SjZBkJg6SZPOAUH8vlUxDgy1E6p5LDVDkFg6SZPOATnYDlSbuuUJ8LalmiJIDJ1EOkfbECw7vTmCdK2TjNI5GHdsbGyYxLjssB+/dmad19W+W9I5xg+2SfylWYLgrIsXL7qTrvwm2f7AG79JtD+Dw5/JwYAcXYP/M2XL9qhsjcrvycefVcihOxwROIkBoTp/i4B5J7LNKUFPS0CAE+z+iDWIwCCbQ0c5rBNCoGtAGP7HDvTsRM9ewoPBoOJ8k+fPn0vn6BHLzBPE+5JzEz05IAtkQL/Y2dlxR7DRYkAcdlWBOPzPf7+2tuYEQE55UsvRI3bImd8689y5c/XNmzfdsQsQg9aCk3jpWg1P50IQWh00DoTCw8ND3Wj6xYuv1six/+LY6enpmi4TRIAEwzNVflziz06kC7a+vi4cRZCeIjDCrMFgULPIkK4UXSw/QGes8erVK5HCQEjIyQacLBPDERBBwrFTSgMIiCAGnCwTwxEQQcKxU0oDCIggBpwsE8MREEHCsVNKAwiIIAacLBPDERBBwrFTSgMIiCAGnCwTwxEQQcKxU0oDCIggBpwsE8MREEHCsVNKAwiIIAacLBPDERBBwrFTSgMIiCAGnCwTwxEQQcKxU0oDCIggBpwsE8MREEHCsVNKAwiIIAacLBPDERBBwrFTSgMIiCAGnCwTwxEQQcKxU0oDCIggBpwsE8MREEHCsVNKAwiIIAacLBPDERBBwrFTSgMIiCAGnCwTwxEQQcKxU0oDCIggBpwsE8MREEHCsVNKAwiIIAacLBPDERBBwrFTSgMIiCAGnCwTwxEQQcKxU0oDCIggBpwsE8MREEHCsVNKAwiIIAacLBPDERBBwrFTSgMIiCAGnCwTwxEQQcKxU0oDCIggBpwsE8MREEHCsVNKAwj8B+fAT5uZSHy2AAAAAElFTkSuQmCC" />
                      </defs>
                    </svg>
                  </td>
                  <td class="table-cell">93 <svg width="29" height="26" viewBox="0 0 29 26" fill="none"
                      xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                      <rect x="0.987305" y="0.9375" width="27.5187" height="24.5438" fill="url(#pattern0_108_1673)" />
                      <defs>
                        <pattern id="pattern0_108_1673" patternContentUnits="objectBoundingBox" width="1" height="1">
                          <use xlink:href="#image0_108_1673" transform="matrix(0.005 0 0 0.00560606 0 -0.060606)" />
                        </pattern>
                        <image id="image0_108_1673" width="200" height="200"
                          xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAAAXNSR0IArs4c6QAAERhJREFUeF7tnVtTFMkWhQtHEPAK0nhhREfx3Yd58o/7Q9TQ0XBmcEJEEGQUUGGcOvFlnPS0c4auNqvy0rVXRXR0Q3de9tp7VV5WVuZUpUsICIETEZgSNkJACJyMgAii6BACIxAQQRQeQkAEUQwIgTAE1IKE4aZURhAQQYw4WmaGISCChOGmVEYQEEGMOFpmhiEggoThplRGEBBBjDhaZoYhIIKE4aZURhAQQYw4WmaGISCChOGmVEYQEEGMOFpmhiEggoThplRGEBBBjDhaZoYhIIKE4aZURhAQQYw4WmaGISCChOGmVEYQEEGMOFpmhiEggoThplRGEBBBjDhaZoYhIIKE4aZURhAQQYw4WmaGISCChOGmVEYQEEGMOFpmhiEggoThplRGEBBBjDhaZoYhIIKE4aZURhAQQYw4WmaGISCChOGmVEYQEEGMOFpmhiEggoThplRGEBBBjDhaZoYhIIKE4aZURhAQQYw4WmaGISCChOGmVEYQEEGMOFpmhiEggoThplRGEBBBjDhaZoYhIIKE4aZURhAQQYw4uhQz5+bm6i9fvlRTU1NfXz/88EO1v79fZCwWWalSnKl6dIPAwsJCfXh4WM3MzFRnz56tTp06VUESXufOnas+fPhQff78uTo+Pua9qJgsqjLduEO5lILAyspK/eeff1ZnzpypZmdnXbU+fvzoyODJsr+/Xx0cHFTT09PVwsJC9ddff1V7e3vFEEUEKSWaelYPyPHmzZtqcXGxOjo6coEPKYaJAlkgxenTp113ixaE199//+1ee3t72eMzewV6Fhcyp6qqwWBQQwjI8enTp6qua0cQWg7eIQREgTBv376t5ubmKsYhfE/3i78hDGlpXXJ2u0QQhXSnCKyurtbc/Xd3d123iYDn5Qfl/m/GH5CF7hfvXHzHZ1ocPvPd+fPnqxcvXvB1lljNUminHlFmxSBw5coV13IQ/AS2bz3aVJBBPV018tve3k4er8kLbAOW0paLwOzsbH316lU3COfF3d8PxtvUmm7Yu3fvKvL+7bffksdr8gLbgKW0ZSIwPT1dX7x40Y0dGDPQxYIgvDP+aHtBtMFg4MYr79+/TxqzSQtrC5TSl4cAA/L5+XnXrYIcEIK7PmMILj++CK05+TKA52JMs7W1RVnJ4jZZQaEAKV25CEAOiMCsFEIgZED4gyT8zcCcoG5zQRBaI8jHeISW6pdffkkWt8kKagOS0paHwPXr191sFTNOXP5OT+vhp3N9y9K29hAQ8jHoX1paqv74449krYgI0tZ7BtPfuXOn3tzcrCCAD15g8NO0XhTke+78bS66V5CPcsgLAiImphqLiCBtvGcw7dmzZ2tEPj8g9+uq6EoRxAQvF58J7LaDdPKh5eDdd9cYrB8fHyeJ3SSFGIyjXpocQ+cYByjfeqDMs06LsQ2zWs+fP48ev9ELGAcA/aZ8BGLpHE2W00LRzaIVoXvFO3+zhuvFixfR4zd6AU0A6PvyEYitc4xCwC9TobvGpIAf69CCPHnyJHr8Ri+gfPerhqMQiK1zNKHvV/n68QetB4P1Dx8+JIndJIU0gaDvy0Qghc7RZDkEQVPxq38Z9DODlmrxogjS5CGj36fUOUZBDEH86l5mztBYdnZ2RBCjcVmE2Sl1jiaDvZLO4BxFHbLwOjg4SHJzT1JIEwj6vhwEUuscTZbTYly+fLni0V3GH3SxdnZ2ksVtsoKagND3+RHIoXPQhfIzVHyGBMxcQQS/GhiSLC8vu9W8qQbn3hsiSP64LKIGuXQOv5QEMkAQvwrYP5fO4JzuFSSiJUn9TIgIUkR45q1ETp0DUtBa8Po3gkAYWpDV1dXq8ePHyeM1eYF5Q0Gl/xOB3DoHCxuHn1f3nz1pGJBfu3aNJe7JZq6GMRJBDHOmBJ1jeJdF7wq/wBGy8AzIy5cvs5AjW6GGY7IY00vROfyYww/K/cDctyS7u7tZb+JZCy8mWoxVpCSdwxMEFwzPZrGCd2trK3t8Zq+AsdjMbm5pOoefvRoGhnVXiILr6+vZ4zN7BbJHjKEKlKhzQBCmb9n7im4V2/s8e/asmLgspiKG4jSLqaXqHGzCsL297TaGo1v16tUrpnyLictiKpIlaowUWrLOwSO6dKcgB8cgpFpjNa7rRZBxkZrQ35WucyACXrhwwbUiR0dHxcVjcRWa0DgsstqToHOwj9bGxkayTRi+11EiyPciNiG/l87RjaNEkG5wLCoX6RzduUME6Q7LInKaFJ1jc3NzImJvIipZRORNQCWkc3TvJBGke0yz5CidIw7sIkgcXJPmKp0jHtwiSDxsk+QsnSMuzCJIXHyj5i6dIyq8LnMRJD7GUUqQzhEF1v/LVARJg3OnpUjn6BTOkZmJIOmw7qQk6RydwDh2JiLI2FDl/6F0jvQ+EEHSYx5UonSOINhaJxJBWkMYPwPpHPExPqkEESQf9mOVLJ1jLJii/UgEiQZt+4ylc7THsG0ORRPk5s2bNTvr+TO4X79+XXR92zpjOL10ji7RDM+ruIA7deqUO6Ce55TZ7YKNi/0Rwzyeubu763b9XllZ4QH/4uof7or/pZTO0QWK3eRRVIAxU3P9+nXXYvAAP7vt8Ugmn9nDlZ0vIA6k+fjxoyNK6u3wu4H95Fykc8RG+PvyL4Igi4uLNbtaDG99DyEgAP8fdbF36/r6Oj8pwpbvg//bX0vnaINenLTZg2phYaGGGP6Fmf5sCN45P2LU9f79++rHH390LczLly+z2xPqJukcocjFTZctoOhKMABnyxd21HNNwH/f/e7e/syIURAMd7nm5+c5hSibTaGuks4Rilz8dNmCaW1trWbQzXhimBDDRPGHq4yCAVIwcOcEVMjC+GWSZrukc8QP8jYlZCHITz/9VL9+/bpi20m6Ub5bNWzI8Lb4owxksD4YDNzRwHTHeEGUjY2NLLZ9jzOkc3wPWnl+mzyIVldX63fv3rkZKe78vLdpQSAS4w/IxkErnEa0v7/vSPLmzZvk9o3rRukc4yKV93fJA+jChQs13aq1tbWvO3q3gcDn9fjxY0cOWiQIQkvCd6Xt9Yqt0jnaeDxt2qQEmZqaqm/duuU0jMPDw2pmZubr4Y2hg3RERLprbJvP+MMf6UWrgobC+dr7+/tJ7RzlQukcaQO8bWnJAufMmTP10tJSxbQs3SoIQnD77lVbQ05KzyzZr7/+6vgXq4xx85XOMS5S5fwuWdDMzMzUly5dct0exD3eaUG448e8Dg4Oqhs3brijhHOeWCSdI6aX4+WdjCBzc3M1XR66PhCDgPXTsvHMq1wrhd7CiynhHAN36RwxPRw37yQEuXfvXv377787YvgLgvgxSEwTISFTwHS1ICjjn5Q6iXSOmN6Nn3cSgqB77O3tubs507J0q7ijpyAI5dC1Y0qZFsTrKyk2T5bOET+AY5eQhCC3b9+uOaRxdnbWTb8yFUtXK1UXi1aDiQEOamHdFhMFkDXmMcPSOWKHbpr8kxDk559/rh89euS6OFzMXNGKQBiIEvOCHHfv3q0ePnxYXblyxRXFBAHLWNBLPn/+3DkG0jliejRt3p0Hx0nVn5+frxkHQAgIwjsEiT2LRUvBGAQRkRktT0zeacFQ9bvUSaRzpA3g2KUlIwgNB08BItwxJiBYuZqWs8cGoEudRDpHbG+lzz8ZQZjm5W6+vLzszsJmTMDfzGblvLrSSaRz5PRivLKTEQQTlpeX3cNR9P0XFhZcK+JnleKZODrnLnQS6Ry5vBe/3KQEwZyVlZWad6ZfvRYS38yTS2irk0jnyOm9+GUnJwgzPLQg6CKszcrdxWqjk7AtETNiPDfP2jK/QJJJCP5mpowWKublF2f6pzH9LCHv/K/0c8hjYtNF3skJQqXZpIFgYk3W8fFxF3YE50EAh+gk165dq5lwYCaOy+/d5ZfRYB/CZOxZuuEHy/yz/P5RZQiyu7ubxcfBDiksYRbwlpaW3C4mtB65Z7GadBIIxDRwXdf11NTU1Pnz52uCHgIsLi66u7TXcvzDW369GQTxs3Wx/D48hqNekIQ6gW9MITSWPaXlm4UggMBuJgRQ7i5Wk05CV5BW4v79+9WDBw/cs+90DdFPaC1oAQlMv7mdbxEJUP4fezm/J8RwYFGXFEtpSgvmGPXJRhBPEv9sCHc9loBwV6ZV4TMD6NgBFgPULvMEl+GWAWxoNcDFd6nYgZKlPPyWB8eePXuW1a9d2p87r+xA8pyIV9i9oyEGz5i/ffv2mxXAucHKUT6EGCbI8OZ6EASctre3na5Eq4XGRG8wR137WGYRQKJA02IgItJ/Z1Ehn4f7930Efxyb/NZHfuD9T4LQpeOGAjnYorXEZ/DHsbPU3xRBEMC5ceNGzYCWMQndLJzN3XN4+rJUEGPWixsGGPCCHP4zhOEFXrTAtCJHR0fF+DMmJinzLgpQWhIczuCdAfDW1pb7bPmSzpHX+0URBCgQ3zY3Nx1BWNTINKzlSzpHXu8XRxDguHr1KprD16XxeSHKW7p0jrz4F0kQIGF2C72BpSCWL+kceb1fLEGABTGx7zqJdI68BGgqvWiC+JakzzqJdI6mEM37ffEEAZ4+6yTSOfISoKn0iSBIn3US6RxNIZr3+4khiG9J+qaTSOfIS4Cm0ieKIH3USaRzNIVo3u8njiB900mkc+QlQFPpE0mQPukk0jmaQjTv9xNLkEnRSaRz5A3wtqVPNEEmQSeRztE2RPOmn3iClK6TSOfIG+BtS+8FQUrWSaRztA3RvOl7Q5BSdRLpHHkDvG3pvSJIiTqJdI62IZo3fe8IUppOIp0jb4C3Lb2XBClJJ5HO0TZE86bvLUFS6SRNOge7jvDgF5sq0JpwkM/Tp097jXvekO629N47Kva+W006Bw98sb8Xz7Sw4yFbGn358qX3uHcbpvlyM+GomM+TNOkcPDLMdqV+36ouj3vLFzZ2SjZBkJg6SZPOAUH8vlUxDgy1E6p5LDVDkFg6SZPOATnYDlSbuuUJ8LalmiJIDJ1EOkfbECw7vTmCdK2TjNI5GHdsbGyYxLjssB+/dmad19W+W9I5xg+2SfylWYLgrIsXL7qTrvwm2f7AG79JtD+Dw5/JwYAcXYP/M2XL9qhsjcrvycefVcihOxwROIkBoTp/i4B5J7LNKUFPS0CAE+z+iDWIwCCbQ0c5rBNCoGtAGP7HDvTsRM9ewoPBoOJ8k+fPn0vn6BHLzBPE+5JzEz05IAtkQL/Y2dlxR7DRYkAcdlWBOPzPf7+2tuYEQE55UsvRI3bImd8689y5c/XNmzfdsQsQg9aCk3jpWg1P50IQWh00DoTCw8ND3Wj6xYuv1six/+LY6enpmi4TRIAEwzNVflziz06kC7a+vi4cRZCeIjDCrMFgULPIkK4UXSw/QGes8erVK5HCQEjIyQacLBPDERBBwrFTSgMIiCAGnCwTwxEQQcKxU0oDCIggBpwsE8MREEHCsVNKAwiIIAacLBPDERBBwrFTSgMIiCAGnCwTwxEQQcKxU0oDCIggBpwsE8MREEHCsVNKAwiIIAacLBPDERBBwrFTSgMIiCAGnCwTwxEQQcKxU0oDCIggBpwsE8MREEHCsVNKAwiIIAacLBPDERBBwrFTSgMIiCAGnCwTwxEQQcKxU0oDCIggBpwsE8MREEHCsVNKAwiIIAacLBPDERBBwrFTSgMIiCAGnCwTwxEQQcKxU0oDCIggBpwsE8MREEHCsVNKAwiIIAacLBPDERBBwrFTSgMIiCAGnCwTwxEQQcKxU0oDCIggBpwsE8MREEHCsVNKAwiIIAacLBPDERBBwrFTSgMIiCAGnCwTwxEQQcKxU0oDCIggBpwsE8MREEHCsVNKAwj8B+fAT5uZSHy2AAAAAElFTkSuQmCC" />
                      </defs>
                    </svg>
                  </td>
                  <td class="table-cell">93 <svg width="29" height="26" viewBox="0 0 29 26" fill="none"
                      xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                      <rect x="0.987305" y="0.9375" width="27.5187" height="24.5438" fill="url(#pattern0_108_1673)" />
                      <defs>
                        <pattern id="pattern0_108_1673" patternContentUnits="objectBoundingBox" width="1" height="1">
                          <use xlink:href="#image0_108_1673" transform="matrix(0.005 0 0 0.00560606 0 -0.060606)" />
                        </pattern>
                        <image id="image0_108_1673" width="200" height="200"
                          xlink:href="data:image/png;base64,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" />
                      </defs>
                    </svg>
                  </td>
                </tr>
                <tr class="table-row">
                  <td class="table-cell">90</td>
                  <td class="table-cell">91</td>
                  <td class="table-cell">92</td>
                  <td class="table-cell">93</td>
                  <td class="table-cell">93</td>
                  <td class="table-cell">93</td>
                </tr>
                <tr class="table-row">
                  <td class="table-cell">90</td>
                  <td class="table-cell">91</td>
                  <td class="table-cell">92</td>
                  <td class="table-cell">93</td>
                  <td class="table-cell">93</td>
                  <td class="table-cell">93</td>
                </tr>
                <tr class="table-row">
                  <td class="table-cell">90</td>
                  <td class="table-cell">91</td>
                  <td class="table-cell">92</td>
                  <td class="table-cell">93</td>
                  <td class="table-cell">93</td>
                  <td class="table-cell">93</td>
                </tr>
                <tr class="table-row">
                  <td class="table-cell">90</td>
                  <td class="table-cell">91</td>
                  <td class="table-cell">92</td>
                  <td class="table-cell">93</td>
                  <td class="table-cell">93</td>
                  <td class="table-cell">93</td>
                </tr>
                <tr class="table-row">
                  <td class="table-cell">90</td>
                  <td class="table-cell">91</td>
                  <td class="table-cell">92</td>
                  <td class="table-cell">93</td>
                  <td class="table-cell">93</td>
                  <td class="table-cell">93</td>
                </tr>



              </tbody>
            </table>
          </div>
          <div class="itemsStatus">
            <div>
              Dostępne: 150
            </div>
            <div>
              Pobrane: 130
            </div>
          </div>
        </div>
      </div>
    </div>

  </body>
</template>

<script>
import GoogleFonts from './googleFonts.vue';
import RouteButton from './RouteButton.vue';
import WUoT_Logo from './WUoT_Logo.vue';



export default {
  name: 'MainWindow',
  components: {
    WUoT_Logo,
    GoogleFonts,
    RouteButton
  }
}
</script>

<style lang="scss">
$primary-bg: black;
$secondary-bg: #050608;
$accent-color: #0083BB;
$text-color: white;
$avatar-bg: #494A4D;
$border-radius-large: 30px;
$button-height: 45px;
$font-family: 'Open Sans', sans-serif;


body {
  background: $primary-bg url('../assets/back.jpg') no-repeat top;
  background-size: 10920px 10080px;
  color: $text-color;
  margin: 0;
  font-family: $font-family;
  text-align: center;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}

input:-webkit-autofill,
textarea:-webkit-autofill,
select:-webkit-autofill {
  border-bottom: 3px solid $accent-color;
  -webkit-text-fill-color: $text-color;
  -webkit-box-shadow: 0 0 0px 1000px $primary-bg inset;
  transition: background-color 5000s ease-in-out 0s;
}

*:focus {
  outline: none;
}

.logo {
  position: absolute;
  top: 0;
  right: 0;
  margin: 10px;
}

button,
.avatars,
.showMap,
.itemTypesButtons,
.itemsVersionsButtons,
.giveItem,
.giveItemWithoutAU,
.checkReservations {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border: none;
  background-color: transparent;
  transition: all 0.3s;
}

.logOut {
  color: $text-color;
}

.avatars,
.showMap,
.itemTypesButtons,
.itemsVersionsButtons {
  border-radius: $border-radius-large;
  background-color: $secondary-bg;
}

.avatars {
  height: 35px;
  width: 35px;
  background-color: $avatar-bg;
  border-radius: 50%;
  margin-right: 10px;
}

.main-nav,
.navigtionButtons {
  display: flex;
  align-items: center;
  height: 70px;
}

.navigtionButtons {
  justify-content: center;
  margin-right: 10px;
}

.showMap {
  width: 160px;
  height: $button-height;
  font-size: 18px;
  margin-right: 100px;
}

.itemTypesButtons,
.itemsVersionsButtons {
  justify-content: space-evenly;
  width: 160px;
  height: 50px;
}

.itemsVersionsButtons {
  width: 106px;
  margin-left: 20px;
}

button.microphones,
button.remote-controllers,
button.keys,
button.primary-version,
button.reserve-version {
  background-color: transparent;
}

.main-page {
  display: flex;
  margin-top: 40px;
  height: 700px;
}

.left-action-buttons {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  width: 30%;
  height: 100%;

  ul {
    position: fixed;
    height: 700px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-around;
    list-style: none;
    margin-top: 4em;
  }
}

.giveItem,
.giveItemWithoutAU,
.checkReservations {
  width: 70%;
  height: 125px;
  font-weight: 500;
  font-size: 16px;
  margin-left: 20px;
  padding: 10px 20px;
  flex-direction: column;
  border-radius: 5px;
}

.giveItem svg,
.giveItemWithoutAU svg,
.checkReservations svg {
  margin-right: 10px;
  margin-bottom: 10px;
}

.itemsTable {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: $secondary-bg;
  height: 700px;
  width: 100%;
  border-radius: $border-radius-large;
  margin: 20px 10% 0 0;
}

.itemsNumber {
  display: flex;
  justify-content: space-evenly;
  height: 85%;
  width: 100%;
  margin: 5px;
}

.table-cell {
  font-size: 32px;
  font-weight: 500;
  padding: 0em 1em;
}

.itemsStatus {
  display: flex;
  align-items: center;
  justify-content: space-around;
  background-color: $avatar-bg;
  width: 90%;
  height: 10%;
  border-radius: 15px;
}

td svg {
  background-color: #397031;
  border-radius: 50%;
  margin-left: 10px;
}

@media (max-width: 768px) {
  .main-page {
    flex-direction: column;
  }

  .left-sidebar {
    width: 100%;
    order: 1;
  }

  .itemsTable {
    order: 2;

    .navigtionButtons {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      margin-bottom: 20px;
    }

    .itemTypesButtons,
    .itemsVersionsButtons {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
    }
  }

  @media (max-width: 480px) {
    .navigtionButtons {
      flex-direction: column;
    }

    .itemTypesButtons,
    .itemsVersionsButtons {
      width: 100%;
    }

    .table-cell {
      font-size: 12px;
    }
  }
}
</style>
