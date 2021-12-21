const container = document.querySelector('#container')
const headScore = document.querySelector('#head-score')
const bodyScore = document.querySelector('#body-score')

const url = "http://api.web.educalinks.com.ec/api/courses/6/distributions"
const token = "1490|fOtKUD8VDR0fjJB8KGz81hZNqhQkLnuE3D7J8FcV"

async function getDistributions () {
    const data = await fetch(url, {
        mode: 'cors',
        cache: 'default',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    })

    return data.json()
}

function drawHead (data = []) {
    console.log(data)

    const tr1 = document.createElement('tr')
    const tr2 = document.createElement('tr')
    const fg1 = document.createDocumentFragment()
    const fg2 = document.createDocumentFragment()
    const fgCell= document.createDocumentFragment()

    data.forEach(d => {
        let th = document.createElement('th')
        th.textContent = d.name
        th.colSpan = (d.distributions == undefined) ? 1 : d.distributions.length + 1
        fg1.appendChild(th)

        if (d.distributions != undefined) {

            d.distributions.map (distribution => {
                let subth = document.createElement('th')
                subth.textContent = distribution.ref2_supply.name
                fg2.appendChild(subth)

                let td = document.createElement('td')
                td.textContent = 9.5
                fgCell.appendChild(td)
            })
            
            let subthResumen = document.createElement('th')
            subthResumen.textContent = 'Resumen'

            let tdResum = document.createElement('td')
            tdResum.textContent = 10

            fg2.appendChild(subthResumen)
            fgCell.appendChild(tdResum)

        } else {
            let subth = document.createElement('th')
            subth.textContent = d.name
            fg2.appendChild(subth)

            let tdResum = document.createElement('td')
            tdResum.textContent = 98
            fgCell.appendChild(tdResum)
        }
    })

    tr1.appendChild(fg1)
    tr2.appendChild(fg2)

    headScore.appendChild(tr1)
    headScore.appendChild(tr2)

    bodyScore.appendChild(fgCell)
}

window.addEventListener('load', async function () {
    drawHead(await getDistributions())
})
