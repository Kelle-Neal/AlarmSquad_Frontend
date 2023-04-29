return (
  <>
    <Button variant="primary" onClick={() => setShowModal(true)}>
      Create Alarm
    </Button>

    <Modal show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Create Alarm</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <FormLabel>Alarm Name</FormLabel>
            <FormControl type="text" value={alarmName} onChange={handleNameChange} />
          </FormGroup>

          <FormGroup>
            <FormLabel>Alarm Time</FormLabel>
            <div className="d-flex align-items-center">
              <FormControl as="select" value={alarmTime.hour} onChange={handleHourChange}>
                {hours.map((hour) => (
                  <option key={hour}>{hour}</option>
                ))}
              </FormControl>
              <span>:</span>
              <FormControl as="select" value={alarmTime.minute} onChange={handleMinuteChange}>
                {minutes.map((minute) => (
                  <option key={minute}>{minute}</option>
                ))}
              </FormControl>
              <FormControl as="select" value={alarmTime.ampm} onChange={handleAmPmChange}>
                {ampm.map((ampm) => (
                  <option key={ampm}>{ampm}</option>
                ))}
              </FormControl>
            </div>
          </FormGroup>

          <FormGroup>
            <Form.Check
              type="checkbox"
              label="Enable Alarm"
              checked={alarmIsEnabled}
              onChange={(event)