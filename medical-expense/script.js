(function() {
    'use strict';

    // --------------------------------------------------------------
    // 1.  DATA SETS
    // --------------------------------------------------------------
    const DATA_SETS = {

        // ---------- DEFAULT (exactly as in the PDF) ----------
        default: {
            claimNumber: '20042047',
            workerName: 'Madeleine Willson',
            prescription: [
                { drug: 'Naproxen', rxDate: 'February 28, 2024', purchased: 'February 29, 2024',
                    provider: 'Dr. Best', amount: '$20.00' }
            ],
            otc: [
                { drug: 'Advil', purchased: 'March 28, 2024', amount: '$8.00', seller: 'Shoppers Drug Mart',
                    reason: 'Pain' }
            ],
            supplies: [
                { item: 'Tensor', purchased: 'February 28, 2024', prescribed: 'Yes',
                    provider: 'Dr. Best', amount: '$10.00', seller: 'Shoppers Drug Mart' }
            ],
            parking: [
                { address: '333 St Mary Ave, Winnipeg MB R3C4A5, Canada', date: 'March 28, 2024',
                    amount: '$10.00', meter: 'yes', meterNum: '12245' }
            ],
            mileage: [
                { date: 'March 28, 2024', providerAddr: 'HSC, 820 Sherbrook St, Winnipeg MB R3A 1R9, Canada',
                    workplaceAddr: 'WCB, 333 Broadway, Winnipeg MB R3C 4W3, Canada', km: '20 km' }
            ]
        },

        // ---------- MULTIPLE ITEMS ----------
        multi: {
            claimNumber: '20042047',
            workerName: 'Madeleine Willson',
            prescription: [
                { drug: 'Naproxen', rxDate: 'February 28, 2024', purchased: 'February 29, 2024',
                    provider: 'Dr. Best', amount: '$20.00' },
                { drug: 'Amoxicillin', rxDate: 'March 10, 2024', purchased: 'March 12, 2024',
                    provider: 'Dr. Chen', amount: '$35.50' },
                { drug: 'Lisinopril', rxDate: 'April 02, 2024', purchased: 'April 04, 2024',
                    provider: 'Dr. Patel', amount: '$42.25' }
            ],
            otc: [
                { drug: 'Advil', purchased: 'March 28, 2024', amount: '$8.00', seller: 'Shoppers Drug Mart',
                    reason: 'Pain' },
                { drug: 'Tylenol', purchased: 'April 05, 2024', amount: '$12.50', seller: 'Walmart',
                    reason: 'Headache' },
                { drug: 'Benadryl', purchased: 'April 12, 2024', amount: '$9.75', seller: 'Rexall',
                    reason: 'Allergy' }
            ],
            supplies: [
                { item: 'Tensor', purchased: 'February 28, 2024', prescribed: 'Yes',
                    provider: 'Dr. Best', amount: '$10.00', seller: 'Shoppers Drug Mart' },
                { item: 'Knee Brace', purchased: 'March 15, 2024', prescribed: 'Yes',
                    provider: 'Dr. Chen', amount: '$45.00', seller: 'MediMart' },
                { item: 'Elastic Bandage', purchased: 'April 01, 2024', prescribed: 'No',
                    provider: '—', amount: '$6.50', seller: 'Walmart' }
            ],
            parking: [
                { address: '333 St Mary Ave, Winnipeg MB R3C4A5, Canada', date: 'March 28, 2024',
                    amount: '$10.00', meter: 'yes', meterNum: '12245' },
                { address: 'HSC, 820 Sherbrook St, Winnipeg MB R3A 1R9, Canada', date: 'April 05, 2024',
                    amount: '$8.00', meter: 'yes', meterNum: '67890' },
                { address: 'Grace Hospital, 300 Booth Dr, Winnipeg MB R3J 3M7, Canada',
                    date: 'April 15, 2024', amount: '$12.00', meter: 'no', meterNum: '—' }
            ],
            mileage: [
                { date: 'March 28, 2024', providerAddr: 'HSC, 820 Sherbrook St, Winnipeg MB R3A 1R9, Canada',
                    workplaceAddr: 'WCB, 333 Broadway, Winnipeg MB R3C 4W3, Canada', km: '20 km' },
                { date: 'April 05, 2024', providerAddr: 'HSC, 820 Sherbrook St, Winnipeg MB R3A 1R9, Canada',
                    workplaceAddr: 'WCB, 333 Broadway, Winnipeg MB R3C 4W3, Canada', km: '20 km' },
                { date: 'April 15, 2024', providerAddr: 'Grace Hospital, 300 Booth Dr, Winnipeg MB R3J 3M7, Canada',
                    workplaceAddr: 'WCB, 333 Broadway, Winnipeg MB R3C 4W3, Canada', km: '32 km' }
            ]
        },

        // ---------- SPARSE / EMPTY ----------
        sparse: {
            claimNumber: '20042047',
            workerName: 'Madeleine Willson',
            prescription: [
                { drug: 'Naproxen', rxDate: 'February 28, 2024', purchased: 'February 29, 2024',
                    provider: 'Dr. Best', amount: '$20.00' }
            ],
            otc: [], // empty
            supplies: [
                { item: 'Tensor', purchased: 'February 28, 2024', prescribed: 'Yes',
                    provider: 'Dr. Best', amount: '$10.00', seller: 'Shoppers Drug Mart' }
            ],
            parking: [], // empty
            mileage: [
                { date: 'March 28, 2024', providerAddr: 'HSC, 820 Sherbrook St, Winnipeg MB R3A 1R9, Canada',
                    workplaceAddr: 'WCB, 333 Broadway, Winnipeg MB R3C 4W3, Canada', km: '20 km' }
            ]
        }
    };

    // --------------------------------------------------------------
    // 2.  RENDER FUNCTION
    // --------------------------------------------------------------
    function render(dataSetKey) {
        const data = DATA_SETS[dataSetKey];
        if (!data) return;

        // --- Claim info ---
        // --- Claim info ---
        document.getElementById('claimNumber').innerHTML = data.claimNumber;
		document.getElementById('workerName').innerHTML = data.workerName;
		document.getElementById('workerAppId').innerHTML = '712041';
		document.getElementById('submittedDate').innerHTML = getSubmittedDate();

        // --- Prescription Drugs ---
        renderTable('prescriptionBody', data.prescription, (item) =>
            `<td>${esc(item.drug)}</td>
                <td>${esc(item.rxDate)}</td>
                <td>${esc(item.purchased)}</td>
                <td>${esc(item.provider)}</td>
                <td>${esc(item.amount)}</td>`
        );

        // --- Over-the-Counter ---
        renderTable('otcBody', data.otc, (item) =>
            `<td>${esc(item.drug)}</td>
                 <td>${esc(item.purchased)}</td>
                 <td>${esc(item.amount)}</td>
                 <td>${esc(item.seller)}</td>
                 <td>${esc(item.reason)}</td>`
        );

        // --- Bandages, Braces, Supplies ---
        renderTable('suppliesBody', data.supplies, (item) =>
            `<td>${esc(item.item)}</td>
                 <td>${esc(item.purchased)}</td>
                 <td>${esc(item.prescribed)}</td>
                 <td>${esc(item.provider)}</td>
                 <td>${esc(item.amount)}</td>
                 <td>${esc(item.seller)}</td>`
        );

        // --- Parking ---
        renderTable('parkingBody', data.parking, (item) =>
            `<td>${esc(item.address)}</td>
                 <td>${esc(item.date)}</td>
                 <td>${esc(item.amount)}</td>
                 <td>${esc(item.meter)}</td>
                 <td>${esc(item.meterNum)}</td>`
        );

        // --- Mileage ---
        renderTable('mileageBody', data.mileage, (item) =>
            `<td>${esc(item.date)}</td>
                 <td>${esc(item.providerAddr)}</td>
                 <td>${esc(item.workplaceAddr)}</td>
                 <td>${esc(item.km)}</td>`
        );

        // --- Page number ---
        const totalRows = data.prescription.length + data.otc.length +
            data.supplies.length + data.parking.length +
            data.mileage.length;
        const pageCount = totalRows > 8 ? 2 : 1;
        document.getElementById('pageNumber').textContent = `Page 1 of ${pageCount}`;

        // --- Update badge ---
        const badge = document.getElementById('dataBadge');
        const counts = [
            data.prescription.length,
            data.otc.length,
            data.supplies.length,
            data.parking.length,
            data.mileage.length
        ];
        const total = counts.reduce((a, b) => a + b, 0);
        badge.textContent =
            `Showing ${total} item${total !== 1 ? 's' : ''} across ${counts.filter(c => c > 0).length} section${counts.filter(c => c > 0).length !== 1 ? 's' : ''}`;

	}

    // --------------------------------------------------------------
    // 3.  TABLE HELPER
    // --------------------------------------------------------------
    function renderTable(bodyId, items, rowRenderer) {
        const tbody = document.getElementById(bodyId);
        if (!tbody) return;

        if (!items || items.length === 0) {
            tbody.innerHTML =
                `<tr class="empty-row"><td colspan="99">No items to display</td></tr>`;
            return;
        }

        let html = '';
        for (const item of items) {
            html += `<tr>${rowRenderer(item)}</tr>`;
        }
        tbody.innerHTML = html;
    }

    // --------------------------------------------------------------
    // 4.  ESCAPE HELPER
    // --------------------------------------------------------------
    function esc(str) {
        if (str == null) return '—';
        const s = String(str);
        return s.replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }
	
	
    function getSubmittedDate() {

      const now = new Date();

      const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      };

      return now.toLocaleString(
        'en-US',
        options
      );

    }
    // --------------------------------------------------------------
    // 5.  SETUP CONTROLS
    // --------------------------------------------------------------
    function setupControls() {

    const selector =
        document.getElementById(
            'datasetSelector'
        );

    selector.addEventListener(
        'change',
        function () {

            render(this.value);

        }
    );

}

    // --------------------------------------------------------------
    // 6.  INIT
    // --------------------------------------------------------------
    render('default');
    setupControls();

})();