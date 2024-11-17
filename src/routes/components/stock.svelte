<script lang="ts">
  import type { Stock } from '../../lib/types'
  const props: {
    stock: Stock
  } = $props()
  const { stock } = props
</script>

<tr>
  <td>
    {stock.ticker}
  </td>
  <td>
    {Math.round(stock.bidPrice) / 100}
  </td>
  <td>
    {Math.round(stock.askPrice) / 100}
  </td>
  <td>
    {Math.round(stock.lastPrice) / 100}
  </td>
</tr>
