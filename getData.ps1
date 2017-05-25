get-wmiobject -namespace "root/OpenHardwareMonitor" Hardware | Out-File 'static/local-hardware-stats.txt' -Encoding 'UTF8'
