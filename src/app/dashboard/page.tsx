useEffect(() => {
  async function fetchUsage() {
    try {
      // Utilise la même IP que l'API estimate (IP réelle du client)
      const ipRes = await fetch('https://api64.ipify.org?format=json')
      const { ip } = await ipRes.json()

      const { data } = await supabase
        .from('usage_limits')
        .select('estimate_count')
        .eq('ip_address', ip)
        .single()

      setUsageCount(data?.estimate_count ?? 0)
    } catch {
      setUsageCount(0)
    } finally {
      setUsageLoading(false)
    }
  }
  fetchUsage()
}, [])