get-wmiobject -namespace "root/OpenHardwareMonitor" Hardware | Out-File 'static/local-hardware-stats.json' -Encoding 'UTF8'
